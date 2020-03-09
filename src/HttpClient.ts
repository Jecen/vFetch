import { IHttpClient, ClientOptions, ClientConfig, SendOptions, RequestOptions } from "HttpClient"
import HttpError from './HttpError'
import NodeFormData from 'form-data'

class HttpClient implements IHttpClient {

  public config: ClientConfig = { baseUrl: '', headers: {} };
  public beforeHooks: (Function| Promise<any>)[];
  public afterHooks: (Function| Promise<any>)[];
  public errorHook: Function;
  public timeout: Number;
  public wrapperFunc?: Function;


  constructor(option: ClientOptions) {
    this._initConfig(option)
    this._initHooks(option)
  }

  _initHooks(options: ClientOptions) {
    const {
      before = [], // 前置钩子
      after = [], // 后置钩子
      error = null, // error钩子
    } = options
    this.beforeHooks = before
    this.afterHooks = after
    this.errorHook = error
  }

  _initConfig(options: ClientOptions) {
    const {
      conf: config,
      timeout = 5000,
      wrapperFunc = null,
    } = options
    this.config = Object.assign(this.config, config)
    this.timeout = timeout
    this.wrapperFunc = wrapperFunc
  }

  get(http: any, url: String, params: any, opt?: SendOptions) {
    return this._sendRequest(http, url, 'GET', params, opt)
  }

  post(http: any, url: String, params: any, opt?: SendOptions) {
    return this._sendRequest(http, url, 'POST', params, opt)
  }

  put(http: any, url: String, params: any, opt?: SendOptions) {
    return this._sendRequest(http, url, 'PUT', params, opt)
  }

  delete(http: any, url: String, params: any, opt?: SendOptions) {
    return this._sendRequest(http, url, 'DELETE', params, opt)
  }

  upload(http: any, url: String, params: any, opt?: SendOptions) {
    return this._sendRequest(http, url, 'UPLOAD', params, opt)
  }

  download(http: any, url: String, params: any, opt?: SendOptions) {
    return this._sendRequest(http, url, 'DOWNLOAD', params, opt)
  }

  setOption(option: ClientOptions) {
    this._initConfig(option)
  }

  injectAfter(after: Function | Promise<any>) {
    after && this.afterHooks.push(after)
  }

  injectBefore(before: Function | Promise<any>) {
    before && this.beforeHooks.push(before)
  }

  setError(onError: Function) {
    if (onError) {
      this.errorHook = onError
    }
  }


  private async _sendRequest(http: any, url: String, method = 'GET', params = {}, opt?: SendOptions) {

    const initUrl = this._initUrl(url, opt)
    const initOpt = this._initOpt(method, params, opt)

    const [finalUrl, finalOpt] = await this._beforeHookGenerator(initUrl, initOpt)

    const [fetchUrl, fetchOpt] = this._getSendOptions(finalUrl, finalOpt)

    let isOver = false
    const overHandler = (error: any) => {
      !isOver && this.errorHook && this.errorHook(error, fetchUrl, fetchOpt)
      isOver = true
    }

    const timeout = opt.timeout || this.timeout 
    const apiPromise = this._getApiPromise(http, fetchUrl, fetchOpt, overHandler, () => isOver, () => { isOver = true })
    const request = this._sendRequestWithTimeOut(apiPromise, overHandler, timeout)
    return request
  }

  /**
   * 初始化请求地址
   * @param url 请求路径
   * @param opt 针对该请求的请求参数
   */
  private _initUrl(url: String, opt?: SendOptions) {
    const urlType = url.indexOf('://') !== -1 ? 'FULL' : 'PATH'
    let base = this.config.baseUrl || ''
    if (urlType === 'FULL') {
      return url
    } else if (opt && opt.baseUrl) {
      const { baseUrl } = opt
      base = baseUrl
    }
    return `${base}${url}`
  }

  /**
   * 初始化请求相关配置
   * @param method 请求方法 GET/POST/PUT/DELETE/UPLOAD/DOWNLOAD
   * @param params 请求参数
   * @param opt 请求配置
   */
  private _initOpt(method: String, params: any, opt?: SendOptions): RequestOptions {
    const finalOpt = { method, params, ...opt || {} }
    const headers = Object.assign({}, this.config.headers, opt.headers || {})
    const isSoftMethod = method === 'GET' || method === 'DELETE'
    const isAlreadySetContentType = !!finalOpt.headers['Content-Type']
    const isHasPayload = !!params
    if (method === 'UPLOAD') { // 请求为上传文件时 Content-Type = undefined 让游览器根据参数类型自行判断类型
      headers['Content-Type'] = undefined // eslint-disable-line
      delete headers['Content-Type']
    } else if (isHasPayload && !isSoftMethod && !isAlreadySetContentType) { // 对于 DOWNLOAD POST PUT 请求 如果不设置content-type则使用这里的默认规则
      headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    }
    finalOpt.headers = headers
    return finalOpt
  }

  /**
   * 前置钩子执行函数
   * @param hooks 钩子数组
   * @param url 请求地址
   * @param opt 请求配置
   */
  private async _beforeHookGenerator(url: String, opt: RequestOptions): Promise<[String, RequestOptions]> {
    let finalUrl = url
    let finalOpt = opt
    const isPromise = (hook: any) => 
      (typeof hook === 'object' || typeof hook === 'function') && typeof hook.then === 'function'
    let cursor = 0
    const max = this.beforeHooks.length
    const loop = async () => {
      if (cursor < max  - 1) {
        const hook: any = this.beforeHooks[cursor]
        const intermediate = isPromise(hook)
          ? await hook([finalUrl, finalOpt])
          : hook([finalUrl, finalOpt])
        if (intermediate) {
          const [cUrl = finalUrl, cOpt = finalOpt] = intermediate
          finalUrl = cUrl
          finalOpt = cOpt
        }
        cursor += 1
        await loop()
      }
    }

    await loop()
    return [finalUrl, finalOpt]
  }

  /**
   * 生成请求发出前的最终配置
   * @param url 请求地址
   * @param opt 请求配置
   */
  private _getSendOptions(url: String, opt: RequestOptions): [String, RequestOptions]{
    const { method, params } = opt
    let rstUrl = url
    const finalOpt = opt
    const isSoftMethod = method === 'GET' || method === 'DELETE'
    const isCustomMethod = method === 'UPLOAD' || method === 'DOWNLOAD'
    // 参数已经构建为 form-data 格式则直接存在 finalOpt 的 body 中
    if (Object.prototype.toString.call(params) === '[object FormData]') {
      finalOpt.body = params
      return [rstUrl,  finalOpt]
    }

    if (!isSoftMethod && !isCustomMethod && params) {
      const contentType = finalOpt.headers['Content-Type'] || ''
      if (contentType.indexOf('application/json') > -1) {
        finalOpt.body = typeof params === 'string' ? params : JSON.stringify(params)
      } else if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        finalOpt.body = Object.keys(params)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
          .join('&')
      } else if (contentType.indexOf('multipart/form-data') > -1 || !contentType) {
        finalOpt.body = this._getFormData(params)
      }
    } else if (isSoftMethod && params) {
      const queryString = this._getQueryData(params)
      if (queryString && queryString.length) {
        rstUrl += `?${queryString}`
      }
    } else if (method === 'UPLOAD') {
      finalOpt.method = 'POST'
      finalOpt.customType = 'UPLOAD'
    } else if (method === 'DOWNLOAD') {
      finalOpt.method = 'GET'
      finalOpt.customType = 'DOWNLOAD'
    }
    return [rstUrl,  finalOpt]
  }

  /**
   * 构建form-data类型的请求体
   * @param params 请求参数
   */
  private _getFormData(params: any) {
    const formData = (typeof module !== 'undefined' && module.exports) ? new NodeFormData() : new FormData()
    const entries = Object.entries(params)
    entries.length > 0 && entries.forEach((q: any) => {
      const [key, val] = q
      if (val && val !== null && val !== undefined && val !== NaN) {
        formData.append(key, val)
      }
    })
    return formData
  }

  /**
   * 构建拼接url的请求参数
   * @param query 请求参数
   */
  private _getQueryData(query: any) {
    if (!query) {
      return null
    }

    const queryList = []
    const entries = Object.entries(query)
    entries.length > 0 && entries.forEach((q: any) => {
      const [key, val] = q
      if (val && val !== null && val !== undefined && val !== NaN) {
        queryList.push(`${key}=${encodeURIComponent(val)}`)
      }
    })
    return queryList.join('&')
  }

  private _getApiPromise(http: any, finalUrl: String, finalOpt: RequestOptions, overHandler: Function, getOverStatus: Function, setOver: Function) {
    return new Promise(async (resolve, reject) => {
      const { body } = finalOpt
      if (body === "{}") {
        delete finalOpt['body']
      }
      try {
        const rsp = await http(finalUrl, finalOpt)
        const temp = this._checkResponse(rsp, reject, finalOpt)
        this._parseResponse(temp, resolve, reject, finalOpt, overHandler, getOverStatus, setOver)
      } catch (e) {
        const error = new HttpError({
          message: HttpError.HTTP_ERROR_MAP[HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED],
          code: HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED,
          httpStatus: null,
        })
        reject(error)
        overHandler(error)
      }
      
    })
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

  /**
   * 简单校验返回值是否符合 accept
   * @param rsp Response
   * @param reject 错误处理
   * @param opt 请求配置
   */
  private _checkResponse(rsp: Response, reject: Function, opt: RequestOptions) { // eslint-disable-line
    const [rspContentType] = rsp.headers.get('Content-Type').split(';')
    const AcceptType = opt.headers.Accept
    const isAllAllow = AcceptType.indexOf('*/*') > -1
    if (AcceptType.indexOf(rspContentType) > -1 || isAllAllow) { // 返回值类型在期望接收类型范围内
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

  /**
   * Response处理方法
   * @param rsp Response
   * @param resolve 处理完成
   * @param reject 处理失败
   * @param opt 请求配置
   * @param overHandler 超时回掉
   * @param getOverStatus 
   * @param setOver 
   */
  async _parseResponse(rsp: Response, resolve: Function, reject: Function, opt: RequestOptions, overHandler: Function, getOverStatus: Function, setOver: Function) {
    const { customType, downloadType = 'immediately' } = opt
    const [rspContentType] = rsp.headers.get('Content-Type').split(';')
    let rst = null
    if (customType === 'DOWNLOAD') {
      if (downloadType === 'immediately' && window) {
        const blob = await rsp.blob()
        const a = window.document.createElement('a')
        const downUrl = window.URL.createObjectURL(blob)// 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
        const filename = rsp.headers.get('Content-Disposition').split('filename=')[1].split('.')
        a.href = downUrl
        a.download = `${decodeURI(filename[0])}.${filename[1]}`
        a.click()
        window.URL.revokeObjectURL(downUrl)
        resolve(this.wrapperFunc('is already download', downloadType))
      } else {
        rst = this.wrapperFunc ? this.wrapperFunc(await rsp.blob(), downloadType) : await rsp.blob()
      }
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

    const isPromise = (hook: any) => 
      (typeof hook === 'object' || typeof hook === 'function') && typeof hook.then === 'function'
    let cursor = 0
    const max = this.afterHooks.length
    const loop = async () => {
      if (cursor < max  - 1) {
        const hook: any = this.afterHooks[cursor]
        const hookRst = isPromise(hook)
          ? await hook(rst)
          : hook(rst)
        if (hookRst instanceof HttpError) {
          reject(hookRst)
          overHandler(hookRst)
        }
        cursor += 1
        await loop()
      }
    }

    await loop()

    setOver()
    resolve(rst)
  }

}

export default HttpClient