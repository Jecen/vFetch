import { Options, SendOptions, RequestOptions, BeforeHookResult, IClient } from "VFetch";
import Request from "./Request";
import HttpError from "./HttpError";


class Client implements IClient {

  public config: any = { baseUrl: '', headers: {}, timeout: 5000 };
  public beforeHooks: (Function| Promise<BeforeHookResult|null|undefined>)[] = [];
  public afterHooks: (Function| Promise<any>)[] = [];
  public errorHook: Function = null;
  public wrapperFunc?: Function = (data: any) => ({
    code: 200,
    message: '',
    data,
    success: true,
  });

  constructor(opt?: Options) {
    if (opt) {
      this._initConfig(opt);
      this._initHooks(opt);
    }
  }

  /**
   * 初始化钩子
   * @param options 配置
   */
  private _initHooks(options: Options) {
    const {
      before = [], // 前置钩子
      after = [], // 后置钩子
      error = null, // error钩子
    } = options;
    this.beforeHooks = before;
    this.afterHooks = after;
    this.errorHook = error;
  }

  /**
   * 初始化请求配置
   * @param options 配置
   */
  private _initConfig(options: Options) {
    const { config, wrapperFunc = null } = options;
    this.config = Object.assign(this.config, config);
    this.wrapperFunc = wrapperFunc || this.wrapperFunc;
  }

  /**
   * 初始化请求地址
   * @param url 请求路径
   * @param opt 针对该请求的请求参数
   */
  private _initUrl(url: String, opt: SendOptions = {}) {
    const { baseUrl = '/' } = this.config
    const urlType = url.indexOf('://') !== -1 ? 'FULL' : 'PATH'
    let base = baseUrl === '/' ? '' : baseUrl
    if (urlType === 'FULL') {
      return url
    } else if (opt.baseUrl) {
      const { baseUrl } = opt
      base = baseUrl === '/' ? '' : baseUrl
    }
    return `${base}${url}`
  }

  /**
   * 初始化请求相关配置
   * @param method 请求方法 GET/POST/PUT/DELETE/UPLOAD/DOWNLOAD
   * @param params 请求参数
   * @param opt 请求配置
   */
  private _initOpt(method: String, params: any, opt: SendOptions = {}): RequestOptions {
    const headers = Object.assign({}, this.config.headers, opt.headers || {})
    const finalOpt = Object.assign({}, this.config, opt, { method, params, headers }) 
    return finalOpt
  }

  /**
   * 前置钩子执行函数
   * @param hooks 钩子数组
   * @param url 请求地址
   * @param opt 请求配置
   */
  private async _beforeHookGenerator(url: String, opt: RequestOptions): Promise<BeforeHookResult | null | undefined> {
    let finalUrl = url
    let finalOpt = opt
    const isPromise = (hook: any) => 
      (typeof hook === 'object' || typeof hook === 'function') && typeof hook.then === 'function'
    let cursor = 0
    const max = this.beforeHooks.length
    const done = () => cursor = max
    const loop = async () => {
      if (cursor < max) {
        const hook: any = this.beforeHooks[cursor]
        const intermediate = hook({url: finalUrl, opt: finalOpt}, done)
        
        if (intermediate) {
          const {url: cUrl = finalUrl, opt: cOpt = finalOpt} = isPromise(intermediate) ? await intermediate : intermediate
          finalUrl = cUrl
          finalOpt = cOpt
        }
        cursor += 1
        await loop()
      }
    }

    await loop()
    return { url: finalUrl, opt: finalOpt }
  }

  private async _afterHookGenerator(response: any): Promise<void> {
    const isPromise = (hook: any) => 
      (typeof hook === 'object' || typeof hook === 'function') && typeof hook.then === 'function'
    let cursor = 0
    const max = this.afterHooks.length
    const done = () => cursor = max
    const loop = async () => {
      if (cursor < max) {
        const hook: any = this.afterHooks[cursor]
        const hookRst = hook(response, done) 
        const hookReturns = isPromise(hookRst) ? await hookRst : hookRst
        if (hookReturns instanceof Error) {
          throw hookRst
        } else {
          cursor += 1
          await loop()
        }
      }
    }
    await loop()
  }

  private async _sendRequest(http: any, url: String, method = 'GET', params = {}, opt: SendOptions = {}) {
    const { skipBefore = false } = opt
    const initUrl = this._initUrl(url, opt)
    const initOpt = this._initOpt(method, params, opt) // 与全局配置 merge
    let finalUrl = initUrl
    let finalOpt = initOpt
    try {
      try {
        if (!skipBefore) { // 跳过前置钩子
          const { url: tempUrl = initUrl, opt: tempOpt = initOpt} = await this._beforeHookGenerator(initUrl, initOpt)
          finalUrl = tempUrl
          finalOpt = tempOpt
        } 
      } catch (error) { // 前置钩子可能出现的报错
        throw new HttpError(error)
      }

      const request = new Request({url: finalUrl, opt: finalOpt})
      let response = await request.send(http)

      if(finalOpt.customType === 'DOWNLOAD') { // 下载不用走 后置的钩子函数
        if (finalOpt.immediately && window) {
          const a = window.document.createElement('a')
          const downUrl = window.URL.createObjectURL(response)// 获取 blob 本地文件连接 (blob 为纯二进制对象，不能够直接保存到磁盘上)
          const filename = finalOpt.filename.split('.') || request.response.headers.get('Content-Disposition').split('filename=')[1].split('.')
          a.href = downUrl
          a.download = `${decodeURI(filename[0])}.${filename[1]}`
          a.click()
          window.URL.revokeObjectURL(downUrl)
          return this.wrapperFunc ? this.wrapperFunc('ok') : response
        } else {
          return this.wrapperFunc ? this.wrapperFunc(response) : response
        }
      }
      if (!finalOpt.skipAfter) {
        await this._afterHookGenerator(response)
      }

      return response
    } catch (error) {
      if (this.errorHook) {
        const handlerError = this.errorHook(error, finalUrl, finalOpt)
        const finalError = typeof handlerError.then === 'function' ? await handlerError : handlerError
        throw finalError || error
      } else {
        throw error
      }
    }
    
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

  setOption(option: Options) {
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

}

export default Client