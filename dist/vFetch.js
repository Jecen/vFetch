(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'babel-runtime/helpers/typeof', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/helpers/extends', 'babel-runtime/helpers/slicedToArray', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/classCallCheck', 'form-data'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/helpers/typeof'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/helpers/extends'), require('babel-runtime/helpers/slicedToArray'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/classCallCheck'), require('form-data'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global._typeof, global.regenerator, global.asyncToGenerator, global._extends, global.slicedToArray, global.createClass, global.classCallCheck, global.formData);
    global.vFetch = mod.exports;
  }
})(this, function (module, exports, _typeof2, _regenerator, _asyncToGenerator2, _extends2, _slicedToArray2, _createClass2, _classCallCheck2, _FormData) {
  'use strict';

  var _typeof3 = _interopRequireDefault(_typeof2);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _extends3 = _interopRequireDefault(_extends2);

  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var HttpError = function HttpError(errorInfo) {
    (0, _classCallCheck3.default)(this, HttpError);
    var message = errorInfo.message,
        code = errorInfo.code,
        _errorInfo$httpStatus = errorInfo.httpStatus,
        httpStatus = _errorInfo$httpStatus === undefined ? 200 : _errorInfo$httpStatus;

    this.httpStatus = httpStatus;
    this.message = message;
    this.code = code;

    this.prototype = Object.create(Error.prototype);
    this.prototype.constructor = this;
  };

  var HTTP_ERROR_MAP = {
    'HTTP_STATUS_ERROR': '服务器未正常响应',
    'REQUEST_TIMEOUT': '请求超时',
    'TOKEN_EXPIRE': 'token校验失效',
    'RESPONSE_PARSING_FAILED': 'reponse解析出错'
  };

  HttpError.ERROR_CODE = {
    HTTP_STATUS_ERROR: 'HTTP_STATUS_ERROR',
    REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',
    TOKEN_EXPIRE: 'TOKEN_EXPIRE',
    RESPONSE_PARSING_FAILED: 'RESPONSE_PARSING_FAILED'
  };

  var HttpShell = function () {
    function HttpShell(option) {
      (0, _classCallCheck3.default)(this, HttpShell);
      var _option$conf = option.conf,
          config = _option$conf === undefined ? {
        baseUrl: '',
        headers: {}
      } : _option$conf,
          _option$before = option.before,
          before = _option$before === undefined ? [] : _option$before,
          _option$after = option.after,
          after = _option$after === undefined ? [] : _option$after,
          _option$error = option.error,
          error = _option$error === undefined ? null : _option$error,
          _option$timeout = option.timeout,
          timeout = _option$timeout === undefined ? 5000 : _option$timeout;

      this.config = config;
      this.beforeHooks = before;
      this.afterHooks = after;
      this.errorHook = error;
      this.timeout = timeout;
    }

    (0, _createClass3.default)(HttpShell, [{
      key: '_getQueryData',
      value: function _getQueryData(query) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'string';

        if (!query) {
          return null;
        }
        if (typeof module !== 'undefined' && module.exports) {}
        var queryList = [];
        var formData = new FormData();
        var entries = Object.entries(query);
        entries.length > 0 && entries.forEach(function (q) {
          var _q = (0, _slicedToArray3.default)(q, 2),
              key = _q[0],
              val = _q[1];

          if (val.length !== 0 && val) {
            queryList.push(key + '=' + encodeURIComponent(val));
            formData.append(key, val);
          }
        });
        return type === 'string' ? queryList.join('&') : formData;
      }
    }, {
      key: '_getRequestOptions',
      value: function _getRequestOptions(_ref) {
        var opt = _ref.opt,
            method = _ref.method,
            params = _ref.params;
        var type = opt.type;


        var finalOpt = (0, _extends3.default)({
          method: method
        }, opt);
        var headers = Object.assign({}, this.config.headers, opt.headers);
        if (type === 'upload') {
          headers['Content-Type'] = undefined;
          delete headers['Content-Type'];
        }
        finalOpt.headers = headers;
        if (Object.prototype.toString.call(params) === '[object FormData]') {
          finalOpt.body = params;
          return finalOpt;
        }
        if (method !== 'GET' && method !== 'OPTION' && params) {
          if (!finalOpt.headers['Content-Type'] && type !== 'upload') {
            finalOpt.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
          }
          var contentType = finalOpt.headers['Content-Type'] || '';
          if (contentType.indexOf('application/json') > -1) {
            finalOpt.body = typeof params === 'string' ? params : JSON.stringify(params);
          } else if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            finalOpt.body = Object.keys(params).map(function (key) {
              return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }).join('&');
          } else if (contentType.indexOf('multipart/form-data') > -1 || !contentType) {
            finalOpt.body = this._getQueryData(params, 'formData');
          }
        }
        return Object.assign({}, this.config, finalOpt);
      }
    }, {
      key: '_checkResponse',
      value: function _checkResponse(rst, reject) {
        return rst;
      }
    }, {
      key: '_initUrl',
      value: function _initUrl(url, method, opt, params) {
        var urlType = url.indexOf('://') !== -1 ? 'FULL' : 'PATH';

        var queryString = null;

        var baseUrl = this.config.baseUrl || '';
        if (opt && opt.baseUrl) {
          var _baseUrl = baseUrl,
              bUrl = _baseUrl.baseUrl;

          baseUrl = bUrl;
        }
        var finalUrl = urlType !== 'FULL' ? baseUrl + url : url;

        if (method === 'GET' || method === 'DELETE' || method === 'OPTION') {
          queryString = this._getQueryData(params);
          if (queryString && queryString.length) {
            finalUrl += '?' + queryString;
          }
        }

        return finalUrl;
      }
    }, {
      key: '_sendRequestWithTimeOut',
      value: function _sendRequestWithTimeOut(apiPromise, overHandler) {
        var _this = this;

        return Promise.race([apiPromise, new Promise(function (_, reject) {
          setTimeout(function () {
            var error = new HttpError({
              message: '请求超时',
              code: HttpError.ERROR_CODE.REQUEST_TIMEOUT,
              httpStatus: 901
            });
            reject(error);
            overHandler(error);
          }, _this.timeout);
        })]);
      }
    }, {
      key: '_getApiPromise',
      value: function _getApiPromise(http, finalUrl, finalOpt, overHandler, getOverStatus, setOver) {
        var _this2 = this;

        var type = finalOpt.type;

        return new Promise(function (resolve, reject) {
          return http(finalUrl, finalOpt).then(function (rsp) {
            return _this2._checkResponse(type === 'download' ? rsp.blob() : rsp.json(), reject);
          }).catch(function () {
            var error = new HttpError({
              message: '请求失败，请检查网络情况，并联系管理员。',
              code: HttpError.ERROR_CODE.RESPONSE_PARSING_FAILED,
              httpStatus: null
            });
            reject(error);
            overHandler(error);
          }).then(function (rsp) {
            var rst = type === 'download' ? { code: 606, data: rsp, success: true, msg: '操作成功' } : rsp;
            _this2.afterHooks.length > 0 && _this2.afterHooks.forEach(function (hook) {
              if (!getOverStatus()) {
                var hookRst = hook(rst);
                if (hookRst instanceof HttpError) {
                  reject(hookRst);
                  overHandler(hookRst);
                }
              }
            });
            setOver();
            resolve(rst);
          });
        });
      }
    }, {
      key: '_sendRequest',
      value: function _sendRequest(http, url) {
        var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';

        var _this3 = this;

        var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};


        var fetchUrl = this._initUrl(url, method, opt, params);

        var fetchOpt = this._getRequestOptions({
          opt: opt,
          method: method,
          params: params
        });

        var _beforeHooks$reduce = this.beforeHooks.reduce(function (_ref2, hook) {
          var _ref3 = (0, _slicedToArray3.default)(_ref2, 2),
              url = _ref3[0],
              opt = _ref3[1];

          return hook([url, opt]) || [url, opt];
        }, [fetchUrl, fetchOpt]),
            _beforeHooks$reduce2 = (0, _slicedToArray3.default)(_beforeHooks$reduce, 2),
            finalUrl = _beforeHooks$reduce2[0],
            finalOpt = _beforeHooks$reduce2[1];

        var isOver = false;
        var overHandler = function overHandler(error) {
          !isOver && _this3.errorHook && _this3.errorHook(error, fetchUrl);
          isOver = true;
        };
        var apiPromise = this._getApiPromise(http, finalUrl, finalOpt, overHandler, function () {
          return isOver;
        }, function () {
          isOver = true;
        });
        var request = this._sendRequestWithTimeOut(apiPromise, overHandler);
        return request;
      }
    }, {
      key: 'injectAfter',
      value: function injectAfter(after) {
        after && this.afterHooks.push(after);
      }
    }, {
      key: 'injectBefore',
      value: function injectBefore(before) {
        before && this.beforeHooks.push(before);
      }
    }, {
      key: 'setError',
      value: function setError(onError) {
        if (onError) {
          this.errorHook = onError;
        }
      }
    }, {
      key: 'get',
      value: function get(http, url, params, opt) {
        return this._sendRequest(http, url, 'GET', params, opt);
      }
    }, {
      key: 'post',
      value: function post(http, url, params, opt) {
        return this._sendRequest(http, url, 'POST', params, opt);
      }
    }, {
      key: 'put',
      value: function put(http, url, params, opt) {
        return this._sendRequest(http, url, 'PUT', params, opt);
      }
    }, {
      key: 'option',
      value: function option(http, url, params, opt) {
        return this._sendRequest(http, url, 'OPTION', params, opt);
      }
    }, {
      key: 'delete',
      value: function _delete(http, url, params, opt) {
        return this._sendRequest(http, url, 'DELETE', params, opt);
      }
    }]);
    return HttpShell;
  }();

  function VFetch(option, instance) {
    var _this4 = this;

    var http = instance || fetch;
    var _option$allow = option.allow,
        allow = _option$allow === undefined ? ['get', 'post', 'put', 'delete', 'option'] : _option$allow;

    var clientWrapper = new HttpShell((0, _extends3.default)({}, option, {
      isNode: !!instance
    }));
    var client = {
      injectAfter: clientWrapper.injectAfter.bind(clientWrapper),
      injectBefore: clientWrapper.injectBefore.bind(clientWrapper),
      setErrorHook: clientWrapper.setError.bind(clientWrapper)
    };
    var allowMethod = allow;

    allowMethod.forEach(function (m) {
      client[m] = function () {
        var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url, params, opt) {
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', clientWrapper[m](http, url, params, opt));

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this4);
        }));

        return function (_x5, _x6, _x7) {
          return _ref4.apply(this, arguments);
        };
      }();
    });

    return client;
  }

  var httpConfig = {
    conf: {
      credentials: 'include',
      baseUrl: '/api',
      headers: {
        Accept: 'application/json'
      }
    },
    before: [function (_ref5) {
      var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
          url = _ref6[0],
          opt = _ref6[1];

      console.log('hook1', url, opt);
    }, function (_ref7) {
      var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
          url = _ref8[0],
          opt = _ref8[1];

      console.log('hook2', url, opt);
    }],
    after: [function (rsp) {
      console.log('after hook1', rsp);
    }],
    timeout: 5000
  };

  VFetch.HttpError = HttpError;
  VFetch.HTTP_ERROR_MAP = HTTP_ERROR_MAP;
  VFetch.httpConfig = httpConfig;

  if ((typeof exports === 'undefined' ? 'undefined' : (0, _typeof3.default)(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : (0, _typeof3.default)(module)) === 'object') {
    module.exports = VFetch;
    module.exports.default = VFetch;
  } else {
    window.VFetch = VFetch;
  }
});