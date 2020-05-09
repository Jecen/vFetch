import { IHttpError, ErrorInfo } from "HttpError"

class HttpError extends Error implements IHttpError {

  public httpStatus: number|string;
  public message: string;
  public code: number|string;
  public nativeError?: Error;
  public response: Response = null;

  public static ERROR_CODE = {
    HTTP_STATUS_ERROR: 'HTTP_STATUS_ERROR',
    REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',
    TOKEN_EXPIRE: 'TOKEN_EXPIRE',
    RESPONSE_PARSING_FAILED: 'RESPONSE_PARSING_FAILED',
  };

  public static HTTP_ERROR_MAP = {
    HTTP_STATUS_ERROR: '服务器未正常响应',
    REQUEST_TIMEOUT: '请求超时',
    TOKEN_EXPIRE: 'token校验失效',
    RESPONSE_PARSING_FAILED: 'response解析出错',
  };

  constructor(errorInfo: ErrorInfo) {
    super()
    const {
      message,
      code,
      httpStatus = 200,
      nativeError,
      response,
    } = errorInfo
    this.httpStatus = httpStatus
    this.message = message
    this.response = response || null
    this.code = code
    this.nativeError = nativeError
  }

}

export default HttpError

