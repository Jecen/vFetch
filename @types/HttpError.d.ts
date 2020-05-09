declare module 'HttpError' {
  
  enum ERROR_CODE {
    HTTP_STATUS_ERROR = 'HTTP_STATUS_ERROR',
    REQUEST_TIMEOUT = 'REQUEST_TIMEOUT',
    TOKEN_EXPIRE = 'TOKEN_EXPIRE',
    RESPONSE_PARSING_FAILED = 'RESPONSE_PARSING_FAILED',
  }
  
  enum HTTP_ERROR_MAP {
    HTTP_STATUS_ERROR = '服务器未正常响应',
    REQUEST_TIMEOUT = '请求超时',
    TOKEN_EXPIRE = 'token校验失效',
    RESPONSE_PARSING_FAILED = 'response解析出错',
  }
  
  interface ErrorInfo {
    readonly message: string;
    readonly code: number|string;
    readonly httpStatus: number|string;
    readonly response?: Response;
    readonly nativeError?: Error;
  }

  interface IHttpError extends Error{
    readonly httpStatus: number|string;
    readonly message: string;
    readonly code: number|string;
    readonly nativeError?: Error;
    readonly response: Response;
  }

}