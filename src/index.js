const NodeFormData = require('form-data')


class HttpError {
  constructor(errorInfo) {
    const {
      message,
      code,
      httpStatus = 200,
      nativeError,
    } = errorInfo
    this.httpStatus = httpStatus
    this.message = message
    this.code = code
    this.nativeError = nativeError

    this.prototype = Object.create(Error.prototype)
    this.prototype.constructor = this
  }
}

const HTTP_ERROR_MAP = {
  'HTTP_STATUS_ERROR': '服务器未正常响应',
  'REQUEST_TIMEOUT': '请求超时',
  'TOKEN_EXPIRE': 'token校验失效',
  'RESPONSE_PARSING_FAILED': 'reponse解析出错',
}

HttpError.ERROR_CODE = {
  HTTP_STATUS_ERROR: 'HTTP_STATUS_ERROR',
  REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',
  TOKEN_EXPIRE: 'TOKEN_EXPIRE',
  RESPONSE_PARSING_FAILED: 'RESPONSE_PARSING_FAILED',
}

class HttpShell {
  constructor(option) {
    const {
      conf: config = { // request配置相关
        baseUrl: '',
        headers: {},
      },
      before = [], // 前置钩子
      after = [], // 后置钩子
      error = null, // error钩子
      timeout = 5000,
      wrapperFunc = null,
    } = option
    this.config = config
    this.beforeHooks = before
    this.afterHooks = after
    this.errorHook = error
    this.timeout = timeout
    this.wrapperFunc = wrapperFunc
  }

  _getQueryData(query, type = 'string') {
    if (!query) {
      return null
    }

    const queryList = []
    const formData = (typeof module !== 'undefined' && module.exports) ? new NodeFormData() : new FormData()
    const entries = Object.entries(query)
    entries.length > 0 && entries.forEach((q) => {
      const [key, val] = q
      if (val.length !== 0 && val) {
        queryList.push(`${key}=${encodeURIComponent(val)}`)
        formData.append(key, val)
      }
    })
    return type === 'string' ? queryList.join('&') : formData
  }

  _getRequestOptions({ opt, method, params }) {
    const { type } = opt
    const finalOpt = { method, ...opt }
    const headers = Object.assign({}, this.config.headers, opt.headers)
    if (type === 'upload') { // 请求为上传文件时 Content-Type = undefined 让游览器根据参数类型自行判断类型
      headers['Content-Type'] = undefined // eslint-disable-line
      delete headers['Content-Type']
    }
    finalOpt.headers = headers
    if (Object.prototype.toString.call(params) === '[object FormData]') {
      finalOpt.body = params
      return finalOpt
    }
    if (method !== 'GET' && method !== 'OPTION' && params) {
      if (!finalOpt.headers['Content-Type'] && type !== 'upload') {
        finalOpt.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      }
      const contentType = finalOpt.headers['Content-Type'] || ''
      if (contentType.indexOf('application/json') > -1) {
        finalOpt.body = typeof params === 'string' ? params : JSON.stringify(params)
      } else if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        finalOpt.body = Object.keys(params).map((key) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        })
          .join('&')
      } else if (contentType.indexOf('multipart/form-data') > -1 || !contentType) {
        finalOpt.body = this._getQueryData(params, 'formData')
      }
    }
    return Object.assign({}, this.config, finalOpt)
  }

  _initUrl(url, method, opt, params) {
    const urlType = url.indexOf('://') !== -1 ? 'FULL' : 'PATH'

    let queryString = null

    let baseUrl = this.config.baseUrl || ''
    if (opt && opt.baseUrl) {
      const { baseUrl: bUrl } = baseUrl
      baseUrl = bUrl
    }
    let finalUrl = urlType !== 'FULL' ?
      baseUrl + url :
      url

    if (method === 'GET' || method === 'DELETE' || method === 'OPTION') {
      queryString = this._getQueryData(params)
      if (queryString && queryString.length) {
        finalUrl += `?${queryString}`
      }
    }

    return finalUrl
  }

  _sendRequestWithTimeOut(apiPromise, overHandler, timeout) {
    return Promise.race([
      apiPromise,
      new Promise((_, reject) => { // eslint-disable-line
        setTimeout(() => {
          const error = new HttpError({
            message: '请求超时',
            code: HttpError.ERROR_CODE.REQUEST_TIMEOUT,
            httpStatus: 901,
          })
          reject(error)
          overHandler(error)
        }, timeout)
      }),
    ])
  }

  _checkResponse(rsp, reject, opt) { // eslint-disable-line
    const [rspContentType] = rsp.headers.get('Content-Type').split(';')
    const AcceptType = opt.headers.Accept
    const isAllAllow = AcceptType.indexOf('*/*') > -1
    if (AcceptType.indexOf(rspContentType) > -1 || isAllAllow) { // 返回值类型在期望接收类型范围内
      // if (rspContentType.indexOf('text') > -1) {
      //   return rsp.text()
      // } else if (rspContentType.indexOf('json') > -1) {
      //   return rsp.json()
      // } else {
      //   const error = new HttpError({
      //     message: `暂不支持类型数据，解析响应出错，请联系管理员。[response-content-type:${rspContentType}]`,
      //     code: HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED,
      //     httpStatus: null,
      //   })
      //   return reject(error)
      // }
      return rsp
    } else {
      const error = new HttpError({
        message: `响应数据类型与预期不符。[accept:${AcceptType};response-content-type:${rspContentType}]`,
        code: HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED,
        httpStatus: null,
      })
      return reject(error)
    }
  }

  async _parseResponse(rsp, resolve, reject, opt, overHandler, getOverStatus, setOver) {
    const { type } = opt
    const [rspContentType] = rsp.headers.get('Content-Type').split(';')
    let rst = null
    if (type === 'download') {
      rst = this.wrapperFunc ? this.wrapperFunc(await rsp.blob(), type) : await rsp.blob()
    } else if (rspContentType.indexOf('text') > -1) {
      rst = this.wrapperFunc ? this.wrapperFunc(await rsp.text(), 'text') : await rsp.text()
    } else if (rspContentType.indexOf('json') > -1) {
      rst = await rsp.json()
    } else {
      const error = new HttpError({
        message: `暂不支持类型数据，解析响应出错，请联系管理员。[response-content-type:${rspContentType}]`,
        code: HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED,
        httpStatus: null,
      })
      reject(error)
    }

    this.afterHooks.length > 0 && this.afterHooks.forEach(hook => {
      if (!getOverStatus()) {
        const hookRst = hook(rst)
        if (hookRst instanceof HttpError) {
          reject(hookRst)
          overHandler(hookRst)
        }
      }
    })
    setOver()
    resolve(rst)
  }


  _getApiPromise(http, finalUrl, finalOpt, overHandler, getOverStatus, setOver) {
    return new Promise((resolve, reject) =>
      http(finalUrl, finalOpt)
        .then((rsp) => {
          const temp = this._checkResponse(rsp, reject, finalOpt)
          this._parseResponse(temp, resolve, reject, finalOpt, overHandler, getOverStatus, setOver)
        })
        .catch(() => {
          const error = new HttpError({
            message: `解析响应出错，请联系管理员。`,
            code: HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED,
            httpStatus: null,
          })
          reject(error)
          overHandler(error)
        })
    )
  }


  _sendRequest(http, url, method = 'GET', params = {}, opt = {}) {

    const fetchUrl = this._initUrl(url, method, opt, params)
    const timeout = opt.timeout || this.timeout 

    const initOpt = { ...opt, method, params }

    const [finalUrl, finalOpt] = this.beforeHooks.reduce(([url, opt], hook) => {
      return hook([url, opt]) || [url, opt]
    }, [fetchUrl, initOpt])

    const fetchOpt = this._getRequestOptions({
      opt: finalOpt,
      method,
      params: finalOpt.params || params,
    })

    let isOver = false
    const overHandler = (error) => {
      !isOver && this.errorHook && this.errorHook(error, fetchUrl)
      isOver = true
    }
    const apiPromise = this._getApiPromise(http, finalUrl, fetchOpt, overHandler, () => isOver, () => { isOver = true })
    const request = this._sendRequestWithTimeOut(apiPromise, overHandler, timeout)
    return request
  }

  injectAfter(after) {
    after && this.afterHooks.push(after)
  }

  injectBefore(before) {
    before && this.beforeHooks.push(before)
  }

  setError(onError) {
    if (onError) {
      this.errorHook = onError
    }
  }

  get(http, url, params, opt) {
    return this._sendRequest(http, url, 'GET', params, opt)
  }

  post(http, url, params, opt) {
    return this._sendRequest(http, url, 'POST', params, opt)
  }

  put(http, url, params, opt) {
    return this._sendRequest(http, url, 'PUT', params, opt)
  }

  option(http, url, params, opt) {
    return this._sendRequest(http, url, 'OPTION', params, opt)
  }

  delete(http, url, params, opt) {
    return this._sendRequest(http, url, 'DELETE', params, opt)
  }
}

function VFetch(option, instance) {
  const http = instance || fetch
  const { allow = ['get', 'post', 'put', 'delete', 'option'] } = option
  const clientWrapper = new HttpShell({
    ...option,
    isNode: !!instance,
  })
  const client = {
    injectAfter: clientWrapper.injectAfter.bind(clientWrapper),
    injectBefore: clientWrapper.injectBefore.bind(clientWrapper),
    setErrorHook: clientWrapper.setError.bind(clientWrapper),
  }
  const allowMethod = allow

  allowMethod.forEach(m => {
    client[m] = async (url, params, opt) => clientWrapper[m](http, url, params, opt)
  })

  return client
}

const httpConfig = {
  conf: {
    credentials: 'include',
    baseUrl: '/api',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
    },
  },
  before: [
    ([url, opt]) => {
      console.log('hook1', url, opt)
    },
    ([url, opt]) => {
      console.log('hook2', url, opt)
    },
  ],
  after: [
    (rsp) => {
      console.log('after hook1', rsp)
    },
  ],
  timeout: 5000,
}

VFetch.HttpError = HttpError
VFetch.HTTP_ERROR_MAP = HTTP_ERROR_MAP
VFetch.httpConfig = httpConfig

module.exports = VFetch