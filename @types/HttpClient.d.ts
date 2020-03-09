
declare module 'HttpClient' {

  interface HttpHeaders {
    'accept'?: string;
    'accept-language'?: string;
    'accept-patch'?: string;
    'accept-ranges'?: string;
    'access-control-allow-credentials'?: string;
    'access-control-allow-headers'?: string;
    'access-control-allow-methods'?: string;
    'access-control-allow-origin'?: string;
    'access-control-expose-headers'?: string;
    'access-control-max-age'?: string;
    'age'?: string;
    'allow'?: string;
    'alt-svc'?: string;
    'authorization'?: string;
    'cache-control'?: string;
    'connection'?: string;
    'content-disposition'?: string;
    'content-encoding'?: string;
    'content-language'?: string;
    'content-length'?: string;
    'content-location'?: string;
    'content-range'?: string;
    'content-type'?: string;
    'cookie'?: string;
    'date'?: string;
    'expect'?: string;
    'expires'?: string;
    'forwarded'?: string;
    'from'?: string;
    'host'?: string;
    'if-match'?: string;
    'if-modified-since'?: string;
    'if-none-match'?: string;
    'if-unmodified-since'?: string;
    'last-modified'?: string;
    'location'?: string;
    'pragma'?: string;
    'proxy-authenticate'?: string;
    'proxy-authorization'?: string;
    'public-key-pins'?: string;
    'range'?: string;
    'referer'?: string;
    'retry-after'?: string;
    'set-cookie'?: string[];
    'strict-transport-security'?: string;
    'tk'?: string;
    'trailer'?: string;
    'transfer-encoding'?: string;
    'upgrade'?: string;
    'user-agent'?: string;
    'vary'?: string;
    'via'?: string;
    'warning'?: string;
    'www-authenticate'?: string;
    [header: string]: string | string[] | undefined;
  }

  interface SendOptions {
    baseUrl?: string;
    headers?: HttpHeaders;
    timeout?: Number;
  }

  interface RequestOptions {
    method: String; // 使用枚举
    params: any;
    headers?: HttpHeaders;
    timeout?: Number;
    baseUrl?: String;
    body?: any;
    customType?: String;
    downloadType?: String;
  }

  interface ClientConfig {
    baseUrl: string;
    headers: HttpHeaders;
  }
  
  interface ClientOptions {
    conf?: ClientConfig,
    before?: (Function| Promise<any>)[],
    after?: (Function| Promise<any>)[],
    error?: Function,
    timeout?: Number,
    wrapperFunc?: Function,
    downloadType?: String,
  }
  
  interface IHttpClient {
    config: ClientConfig;
    beforeHooks: (Function| Promise<any>)[];
    afterHooks: (Function| Promise<any>)[];
    errorHook: Function;
    timeout: Number;
    wrapperFunc?: Function;

    get?(http: any, url: String, params: any, opt: ClientOptions): Promise<any>;
    post?(http: any, url: String, params: any, opt: ClientOptions): Promise<any>;
    put?(http: any, url: String, params: any, opt: ClientOptions): Promise<any>;
    delete?(http: any, url: String, params: any, opt: ClientOptions): Promise<any>;
    upload?(http: any, url: String, params: any, opt: ClientOptions): Promise<any>;
    download?(http: any, url: String, params: any, opt: ClientOptions): Promise<any>;
    
    setOption(option: ClientOptions): void;
    injectAfter(after: Function| Promise<any>): void;
    injectBefore(after: Function| Promise<any>): void;
    setError(onError: Function): void;
  }

}