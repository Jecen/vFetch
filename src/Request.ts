import { RequestOptions, BeforeHookResult } from "VFetch"
import NodeFormData from 'form-data'
import HttpError from "./HttpError";

export default class Request {
  public url: String;
  public opt: RequestOptions;
  public isOver: Boolean = false;
  public response: Response;

  constructor(options: any) {
    const {url, opt} = options
    this.url = url
    this.opt = opt

    this._handlerUrl()
    this._handlerOpt()
  }

  /**
   * 验证传递的参数是否为有效参数
   * @param value 值
   */
  private _isEffectiveParams(value: any) {
    if (value === 0 || value === '') { // 传值为 0 或者 空字符串则认为是有效字段
      return true
    } else if(value && value !== null && value !== undefined && value !== NaN) {
      return true
    } else {
      return false
    }
  }

  /**
   * 处理请求地址的方法
   */
  private _handlerUrl() {
    const { method, params } = this.opt
    const isSoftMethod = method === 'GET' || method === 'DELETE'
    if (isSoftMethod && params) {
      this.opt.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      const queryString = this._getQueryData(params)
      if (queryString && queryString.length) {
        this.url += `?${queryString}`
      }
    }
  }

  /**
   * 处理请求相关配置方法
   */
  private _handlerOpt() {
    const { method, params } = this.opt
    const isSoftMethod = method === 'GET' || method === 'DELETE'
    const isCustomMethod = method === 'UPLOAD' || method === 'DOWNLOAD'

    // 参数已经构建为 form-data 格式则直接存在 finalOpt 的 body 中
    if (Object.prototype.toString.call(params) === '[object FormData]') {
      this.opt.body = params
      return 
    }

    if (!isSoftMethod && !isCustomMethod && params) {
      const contentType = this.opt.headers['Content-Type'] || ''
      if (contentType.indexOf('application/json') > -1) {
        this.opt.body = typeof params === 'string' ? params : JSON.stringify(params)
      } else if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        this.opt.body = this._getQueryData(params)
      } else if (contentType.indexOf('multipart/form-data') > -1 || !contentType || method === 'UPLOAD') {
        this.opt.body = this._getFormData(params)
      }
    } else if (method === 'UPLOAD') {
      this.opt.method = 'POST'
      this.opt.customType = 'UPLOAD'
      this.opt.headers['Content-Type'] = ''
      this.opt.body = this._getFormData(params)
      delete this.opt.headers['Content-Type']
    } else if (method === 'DOWNLOAD') {
      this.opt.method = 'GET'
      this.opt.customType = 'DOWNLOAD'
      this.opt.body = this._getQueryData(params)
    }
  }

  /**
   * 获取form-data格式参数的方法
   * @param params 请求参数
   */
  private _getFormData(params: any): any {
    const formData = (typeof window === 'undefined') ? new NodeFormData() : new FormData()
    const entries = Object.entries(params)
    entries.length > 0 && entries.forEach((q: any) => {
      const [key, val] = q
      if (this._isEffectiveParams(val)) {
        formData.append(key, val)
      }
    })
    return formData
  }

  /**
   * 获取拼接后的参数字符串
   * @param params 请求参数
   */
  private _getQueryData(params: any): String {
    if (!params) {
      return ''
    }

    const queryList = []
    const entries = Object.entries(params)
    entries.length > 0 && entries.forEach((q: any) => {
      const [key, val] = q
      if (this._isEffectiveParams(val)) {
        queryList.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
      }
    })
    return queryList.join('&')
  }

  /**
   * 简单校验返回值是否符合 accept
   * @param rsp Response
   */
  private _checkResponse(rsp: Response) { // eslint-disable-line
    const { status, headers } = rsp
    const [rspContentType] = headers.get('Content-Type') ? headers.get('Content-Type').split(';') : ['json']
    const AcceptType = this.opt.headers.Accept || '*/*'
    const isAllAllow = AcceptType.indexOf('*/*') > -1

    // 对 accept 做校验
    if (!rspContentType || (AcceptType.indexOf(rspContentType) === -1 && !isAllAllow)) { // 返回值类型在期望接收类型范围内
      const error = new HttpError({
        message: `响应数据类型与预期不符。[accept:${AcceptType};response-content-type:${rspContentType}]`,
        code: HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED,
        httpStatus: null,
      })
      throw error
    }
    // 对 status 做校验
    if(status !== 200) {
      const error = new HttpError({
        message: '请求异常,请检查网络并核实接口。',
        code: HttpError.ERROR_CODE.HTTP_STATUS_ERROR,
        httpStatus: status,
        response: rsp.clone(),
      })
      throw error
    }
  }

  private async _fetch(http: any, url: any, opt: any) {
    try {
      return await http(url, opt)
    } catch (e) {
      const error = new HttpError({
        message: HttpError.HTTP_ERROR_MAP[HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED],
        code: HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED,
        httpStatus: null,
        nativeError: e
      })
      throw error
    }
  }

  /**
   * Response处理方法
   * @param rsp Response
   */
  async _parseResponse(rsp: Response) {
    const { customType, immediately = false } = this.opt
    const [rspContentType] = rsp.headers.get('Content-Type') ? rsp.headers.get('Content-Type').split(';') : ['json'] 
    
    const parse = async (type: string) => {
      try {
        return await rsp[type]() 
      } catch (e) {
        const error = new HttpError({
          message: `解析响应出错，请联系管理员。[${type}]`,
          code: HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED,
          httpStatus: null,
          nativeError: e,
        })
        throw error
      }
    }

    if (customType === 'DOWNLOAD') {
      return await parse('blob')
    } else if (rspContentType.indexOf('text') > -1) {
      return await parse('text')
    } else if (rspContentType.indexOf('json') > -1) {
      return await parse('json')
    } else {
      const error = new HttpError({
        message: `暂不支持类型数据，解析响应出错，请联系管理员。[response-content-type:${rspContentType}]`,
        code: HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED,
        httpStatus: null,
      })
      throw error
    }
  }

  public async send(http: any) {
    const fetchOptions = Object.assign({}, this.opt)
    const { timeout, body } = fetchOptions
    if (body === "{}") {
      delete fetchOptions['body']
    }
    const rsp = await this.timeoutWrapper(this._fetch(http, this.url, fetchOptions), timeout)

    this.response = rsp.clone()
    this._checkResponse(rsp)
    const rst = this._parseResponse(rsp)
    return rst
  }

  /**
   * 超时实现
   * @param request 请求
   * @param timeout 超时时限
   */
  private timeoutWrapper(request: Promise<any>, timeout: any): Promise<Response>{
    const timeoutPromise = new Promise((_, reject) => { // eslint-disable-line
      setTimeout(() => {
        const error = new HttpError({
          message: '请求超时',
          code: HttpError.ERROR_CODE.REQUEST_TIMEOUT,
          httpStatus: 901,
        })
        reject(error)
      }, timeout)
    })
    return Promise.race([request, timeoutPromise])
  }

}
