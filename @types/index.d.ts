
declare module 'VFetch' {

  interface Headers {
    [header: string]: string | string[] | undefined;
  }
  
  interface FetchConfig {
    credentials?: String;
    headers?: Headers;
    body?: any;
    method?: String;
  }

  interface ClientConfig extends FetchConfig {
    timeout?: Number;
    baseUrl?: String;
  }

  interface Options {
    config?: ClientConfig;
    before?: (Function| Promise<any>)[];
    after?: (Function| Promise<Error | null | undefined>)[];
    error?: Function;
    wrapperFunc?: Function;
    allow: string[];
  }

  interface IVFetch {

    get?(url: String, params: any, opt: any): Promise<any>;
    post?(url: String, params: any, opt: any): Promise<any>;
    put?(url: String, params: any, opt: any): Promise<any>;
    delete?(url: String, params: any, opt: any): Promise<any>;
    download?(url: String, params: any, opt: any): Promise<any>;
    upload?(url: String, params: any, opt: any): Promise<any>;

    setOption(option: Options): void;
    injectAfter(after: Function| Promise<any>): void;
    injectBefore(after: Function| Promise<any>): void;
    setErrorHook(onError: Function): void;
  }

  interface SendOptions extends FetchConfig {
    baseUrl?: string;
    timeout?: Number;
    immediately?: Boolean;
    filename?: String;
    skipBefore?: Boolean;
    skipAfter?: Boolean;
  }

  interface RequestOptions extends SendOptions{
    method: String;
    params: any;
    headers: Headers;
    body: any;
    customType?: String;
  }

  interface BeforeHookResult {
    url: String;
    opt: RequestOptions;
  }

  interface IClient {
    get(url: String, params: any, opt: any): Promise<any>;
    post(url: String, params: any, opt: any): Promise<any>;
    put(url: String, params: any, opt: any): Promise<any>;
    delete(url: String, params: any, opt: any): Promise<any>;
    download(url: String, params: any, opt: any): Promise<any>;
    upload(url: String, params: any, opt: any): Promise<any>;

    setOption(option: Options): void;
    injectAfter(after: Function| Promise<any>): void;
    injectBefore(after: Function| Promise<any>): void;
    setError(onError: Function): void;
  }

  interface IRequest {
    url: String;
    opt: RequestOptions;
    isOver: Boolean;
    http: any;
    response: Response;

    send(): Promise<any>;
  }
}