
declare module 'VFetch' {

  interface Headers {
    [header: string]: string | string[] | undefined;
  }
  
  interface FetchConfig {
    credentials?: string;
    headers?: Headers;
    body?: any;
    method?: string;
  }

  interface ClientConfig extends FetchConfig {
    timeout?: number;
    baseUrl?: string;
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

    get?(url: string, params: any, opt: any): Promise<any>;
    post?(url: string, params: any, opt: any): Promise<any>;
    put?(url: string, params: any, opt: any): Promise<any>;
    delete?(url: string, params: any, opt: any): Promise<any>;
    download?(url: string, params: any, opt: any): Promise<any>;
    upload?(url: string, params: any, opt: any): Promise<any>;

    setOption(option: Options): void;
    injectAfter(after: Function| Promise<any>): void;
    injectBefore(after: Function| Promise<any>): void;
    setErrorHook(onError: Function): void;
  }

  interface SendOptions extends FetchConfig {
    baseUrl?: string;
    timeout?: number;
    immediately?: boolean;
    filename?: string;
    skipBefore?: boolean;
    skipAfter?: boolean;
  }

  interface RequestOptions extends SendOptions{
    method: string;
    params: any;
    headers: Headers;
    body: any;
    customType?: string;
  }

  interface BeforeHookResult {
    url: string;
    opt: RequestOptions;
  }

  interface IClient {
    get(url: string, params: any, opt: any): Promise<any>;
    post(url: string, params: any, opt: any): Promise<any>;
    put(url: string, params: any, opt: any): Promise<any>;
    delete(url: string, params: any, opt: any): Promise<any>;
    download(url: string, params: any, opt: any): Promise<any>;
    upload(url: string, params: any, opt: any): Promise<any>;

    setOption(option: Options): void;
    injectAfter(after: Function| Promise<any>): void;
    injectBefore(after: Function| Promise<any>): void;
    setError(onError: Function): void;
  }

  interface IRequest {
    url: string;
    opt: RequestOptions;
    isOver: boolean;
    http: any;
    response: Response;

    send(): Promise<any>;
  }
}