!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("vFetch",[],e):"object"==typeof exports?exports.vFetch=e():t.vFetch=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=45)}([function(t,e){var n=t.exports={version:"2.5.7"};"number"==typeof __e&&(__e=n)},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var r=n(34)("wks"),o=n(35),i=n(1).Symbol,u="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=u&&i[t]||(u?i:o)("Symbol."+t))}).store=r},function(t,e,n){var r=n(1),o=n(0),i=n(10),u=n(5),c=n(13),a=function(t,e,n){var s,f,l,p=t&a.F,h=t&a.G,v=t&a.S,d=t&a.P,y=t&a.B,m=t&a.W,g=h?o:o[e]||(o[e]={}),_=g.prototype,x=h?r:v?r[e]:(r[e]||{}).prototype;for(s in h&&(n=e),n)(f=!p&&x&&void 0!==x[s])&&c(g,s)||(l=f?x[s]:n[s],g[s]=h&&"function"!=typeof x[s]?n[s]:y&&f?i(l,r):m&&x[s]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(l):d&&"function"==typeof l?i(Function.call,l):l,d&&((g.virtual||(g.virtual={}))[s]=l,t&a.R&&_&&!_[s]&&u(_,s,l)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){var r=n(9);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(8),o=n(30);t.exports=n(6)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){t.exports=!n(12)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports={}},function(t,e,n){var r=n(4),o=n(53),i=n(54),u=Object.defineProperty;e.f=n(6)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(11);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(58),o=n(36);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(32),o=n(19);t.exports=function(t){return r(o(t))}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){"use strict";var r=n(52)(!0);n(29)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports=!0},function(t,e,n){var r=n(9),o=n(1).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(34)("keys"),o=n(35);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(8).f,o=n(13),i=n(2)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(19);t.exports=function(t){return Object(r(t))}},function(t,e,n){n(62);for(var r=n(1),o=n(5),i=n(7),u=n(2)("toStringTag"),c="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),a=0;a<c.length;a++){var s=c[a],f=r[s],l=f&&f.prototype;l&&!l[u]&&o(l,u,s),i[s]=i.Array}},function(t,e,n){var r=n(16),o=n(2)("toStringTag"),i="Arguments"==r(function(){return arguments}());t.exports=function(t){var e,n,u;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),o))?n:i?r(e):"Object"==(u=r(e))&&"function"==typeof e.callee?"Arguments":u}},function(t,e,n){"use strict";var r=n(11);t.exports.f=function(t){return new function(t){var e,n;this.promise=new t(function(t,r){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=r}),this.resolve=r(e),this.reject=r(n)}(t)}},function(t,e,n){t.exports={default:n(50),__esModule:!0}},function(t,e,n){"use strict";var r=n(20),o=n(3),i=n(55),u=n(5),c=n(7),a=n(56),s=n(23),f=n(61),l=n(2)("iterator"),p=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,e,n,v,d,y,m){a(n,e,v);var g,_,x,w=function(t){if(!p&&t in T)return T[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},b=e+" Iterator",O="values"==d,E=!1,T=t.prototype,S=T[l]||T["@@iterator"]||d&&T[d],j=S||w(d),P=d?O?w("entries"):j:void 0,R="Array"==e&&T.entries||S;if(R&&(x=f(R.call(new t)))!==Object.prototype&&x.next&&(s(x,b,!0),r||"function"==typeof x[l]||u(x,l,h)),O&&S&&"values"!==S.name&&(E=!0,j=function(){return S.call(this)}),r&&!m||!p&&!E&&T[l]||u(T,l,j),c[e]=j,c[b]=h,d)if(g={values:O?j:w("values"),keys:y?j:w("keys"),entries:P},m)for(_ in g)_ in T||i(T,_,g[_]);else o(o.P+o.F*(p||E),e,g);return g}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(4),o=n(57),i=n(36),u=n(22)("IE_PROTO"),c=function(){},a=function(){var t,e=n(21)("iframe"),r=i.length;for(e.style.display="none",n(37).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;r--;)delete a.prototype[i[r]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(c.prototype=r(t),n=new c,c.prototype=null,n[u]=t):n=a(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(16);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(18),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(0),o=n(1),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(20)?"pure":"global",copyright:"© 2018 Denis Pushkarev (zloirock.ru)"})},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(26),o=n(2)("iterator"),i=n(7);t.exports=n(0).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e,n){var r=n(4),o=n(11),i=n(2)("species");t.exports=function(t,e){var n,u=r(t).constructor;return void 0===u||void 0==(n=r(u)[i])?e:o(n)}},function(t,e,n){var r,o,i,u=n(10),c=n(70),a=n(37),s=n(21),f=n(1),l=f.process,p=f.setImmediate,h=f.clearImmediate,v=f.MessageChannel,d=f.Dispatch,y=0,m={},g=function(){var t=+this;if(m.hasOwnProperty(t)){var e=m[t];delete m[t],e()}},_=function(t){g.call(t.data)};p&&h||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return m[++y]=function(){c("function"==typeof t?t:Function(t),e)},r(y),y},h=function(t){delete m[t]},"process"==n(16)(l)?r=function(t){l.nextTick(u(g,t,1))}:d&&d.now?r=function(t){d.now(u(g,t,1))}:v?(i=(o=new v).port2,o.port1.onmessage=_,r=u(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(r=function(t){f.postMessage(t+"","*")},f.addEventListener("message",_,!1)):r="onreadystatechange"in s("script")?function(t){a.appendChild(s("script")).onreadystatechange=function(){a.removeChild(this),g.call(t)}}:function(t){setTimeout(u(g,t,1),0)}),t.exports={set:p,clear:h}},function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,e,n){var r=n(4),o=n(9),i=n(27);t.exports=function(t,e){if(r(t),o(e)&&e.constructor===t)return e;var n=i.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){t.exports={default:n(84),__esModule:!0}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){"use strict";var r=d(n(46)),o=d(n(49)),i=d(n(28)),u=d(n(78)),c=d(n(82)),a=d(n(43)),s=d(n(88)),f=d(n(89)),l=d(n(96)),p=d(n(100)),h=d(n(104)),v=d(n(107));function d(t){return t&&t.__esModule?t:{default:t}}var y=n(108),m=function t(e){(0,v.default)(this,t);var n=e.message,r=e.code,o=e.httpStatus,i=void 0===o?200:o,u=e.nativeError;this.httpStatus=i,this.message=n,this.code=r,this.nativeError=u,this.prototype=(0,h.default)(Error.prototype),this.prototype.constructor=this};m.ERROR_CODE={HTTP_STATUS_ERROR:"HTTP_STATUS_ERROR",REQUEST_TIMEOUT:"REQUEST_TIMEOUT",TOKEN_EXPIRE:"TOKEN_EXPIRE",RESPONSE_PARSING_FAILED:"RESPONSE_PARSING_FAILED"};var g=function(){function e(t){(0,v.default)(this,e);var n=t.conf,r=void 0===n?{baseUrl:"",headers:{}}:n,o=t.before,i=void 0===o?[]:o,u=t.after,c=void 0===u?[]:u,a=t.error,s=void 0===a?null:a,f=t.timeout,l=void 0===f?5e3:f,p=t.wrapperFunc,h=void 0===p?null:p;this.config=r,this.beforeHooks=i,this.afterHooks=c,this.errorHook=s,this.timeout=l,this.wrapperFunc=h}return(0,p.default)(e,[{key:"_getQueryData",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"string";if(!e)return null;var r=[],o=t.exports?new y:new FormData,i=(0,l.default)(e);return i.length>0&&i.forEach(function(t){var e=(0,f.default)(t,2),n=e[0],i=e[1];0!==i.length&&i&&(r.push(n+"="+encodeURIComponent(i)),o.append(n,i))}),"string"===n?r.join("&"):o}},{key:"_getInitOpt",value:function(t){var e=t.opt,n=t.method,r=t.params,o=e.type,i=(0,s.default)({method:n,params:r},e),u=(0,a.default)({},this.config.headers,e.headers);if("upload"===o&&(u["Content-Type"]=void 0,delete u["Content-Type"]),i.headers=u,"GET"!==n&&"OPTION"!==n&&r){i.headers["Content-Type"]||"upload"===o||(i.headers["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8");i.headers["Content-Type"]}return i}},{key:"_getRequestOptions",value:function(t){var e=t.opt,n=t.method,r=t.params,o=e.type,i=(0,s.default)({method:n},e),f=(0,a.default)({},this.config.headers,e.headers);if("upload"===o&&(f["Content-Type"]=void 0,delete f["Content-Type"]),i.headers=f,"[object FormData]"===Object.prototype.toString.call(r))return i.body=r,i;if("GET"!==n&&"OPTION"!==n&&r){i.headers["Content-Type"]||"upload"===o||(i.headers["Content-Type"]="application/x-www-form-urlencoded;charset=UTF-8");var l=i.headers["Content-Type"]||"";l.indexOf("application/json")>-1?i.body="string"==typeof r?r:(0,c.default)(r):l.indexOf("application/x-www-form-urlencoded")>-1?i.body=(0,u.default)(r).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(r[t])}).join("&"):(l.indexOf("multipart/form-data")>-1||!l)&&(i.body=this._getQueryData(r,"formData"))}return(0,a.default)({},this.config,i)}},{key:"_initUrl",value:function(t,e,n,r){var o=-1!==t.indexOf("://")?"FULL":"PATH",i=null,u=this.config.baseUrl||"";n&&n.baseUrl&&(u=u.baseUrl);var c="FULL"!==o?u+t:t;return"GET"!==e&&"DELETE"!==e&&"OPTION"!==e||(i=this._getQueryData(r))&&i.length&&(c+="?"+i),c}},{key:"_sendRequestWithTimeOut",value:function(t,e,n){return i.default.race([t,new i.default(function(t,r){setTimeout(function(){var t=new m({message:"请求超时",code:m.ERROR_CODE.REQUEST_TIMEOUT,httpStatus:901});r(t),e(t)},n)})])}},{key:"_checkResponse",value:function(t,e,n){var r=t.headers.get("Content-Type").split(";"),o=(0,f.default)(r,1)[0],i=n.headers.Accept,u=i.indexOf("*/*")>-1;return i.indexOf(o)>-1||u?t:e(new m({message:"响应数据类型与预期不符。[accept:"+i+";response-content-type:"+o+"]",code:m.ERROR_CODE.RESPONSE_PARSING_FAILED,httpStatus:null}))}},{key:"_parseResponse",value:function(){var t=(0,o.default)(r.default.mark(function t(e,n,o,i,u,c,a){var s,l,p,h,v,d;return r.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(s=i.type,l=e.headers.get("Content-Type").split(";"),p=(0,f.default)(l,1),h=p[0],v=null,"download"!==s){t.next=19;break}if(!this.wrapperFunc){t.next=13;break}return t.t1=this,t.next=8,e.blob();case 8:t.t2=t.sent,t.t3=s,t.t0=t.t1.wrapperFunc.call(t.t1,t.t2,t.t3),t.next=16;break;case 13:return t.next=15,e.blob();case 15:t.t0=t.sent;case 16:v=t.t0,t.next=42;break;case 19:if(!(h.indexOf("text")>-1)){t.next=34;break}if(!this.wrapperFunc){t.next=28;break}return t.t5=this,t.next=24,e.text();case 24:t.t6=t.sent,t.t4=t.t5.wrapperFunc.call(t.t5,t.t6,"text"),t.next=31;break;case 28:return t.next=30,e.text();case 30:t.t4=t.sent;case 31:v=t.t4,t.next=42;break;case 34:if(!(h.indexOf("json")>-1)){t.next=40;break}return t.next=37,e.json();case 37:v=t.sent,t.next=42;break;case 40:d=new m({message:"暂不支持类型数据，解析响应出错，请联系管理员。[response-content-type:"+h+"]",code:m.ERROR_CODE.RESPONSE_PARSING_FAILED,httpStatus:null}),o(d);case 42:this.afterHooks.length>0&&this.afterHooks.forEach(function(t){if(!c()){var e=t(v);e instanceof m&&(o(e),u(e))}}),a(),n(v);case 45:case"end":return t.stop()}},t,this)}));return function(e,n,r,o,i,u,c){return t.apply(this,arguments)}}()},{key:"_getApiPromise",value:function(t,e,n,r,o,u){var c=this;return new i.default(function(i,a){return t(e,n).then(function(t){var e=c._checkResponse(t,a,n);c._parseResponse(e,i,a,n,r,o,u)}).catch(function(){var t=new m({message:"解析响应出错，请联系管理员。",code:m.ERROR_CODE.RESPONSE_PARSING_FAILED,httpStatus:null});a(t),r(t)})})}},{key:"_sendRequest",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",r=this,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},u=this._initUrl(e,n,i,o),c=i.timeout||this.timeout,a=this._getInitOpt({opt:i,method:n,params:o}),s=this.beforeHooks.reduce(function(t,e){var n=(0,f.default)(t,2),r=n[0],o=n[1];return e([r,o])||[r,o]},[u,a]),l=(0,f.default)(s,2),p=l[0],h=l[1],v=this._getRequestOptions({opt:h,method:n,params:h.params||o}),d=!1,y=function(t){!d&&r.errorHook&&r.errorHook(t,u),d=!0},m=this._getApiPromise(t,p,v,y,function(){return d},function(){d=!0});return this._sendRequestWithTimeOut(m,y,c)}},{key:"injectAfter",value:function(t){t&&this.afterHooks.push(t)}},{key:"injectBefore",value:function(t){t&&this.beforeHooks.push(t)}},{key:"setError",value:function(t){t&&(this.errorHook=t)}},{key:"get",value:function(t,e,n,r){return this._sendRequest(t,e,"GET",n,r)}},{key:"post",value:function(t,e,n,r){return this._sendRequest(t,e,"POST",n,r)}},{key:"put",value:function(t,e,n,r){return this._sendRequest(t,e,"PUT",n,r)}},{key:"option",value:function(t,e,n,r){return this._sendRequest(t,e,"OPTION",n,r)}},{key:"delete",value:function(t,e,n,r){return this._sendRequest(t,e,"DELETE",n,r)}}]),e}();function _(t,e){var n=this,i=e||fetch,u=t.allow,c=void 0===u?["get","post","put","delete","option"]:u,a=new g((0,s.default)({},t,{isNode:!!e})),f={injectAfter:a.injectAfter.bind(a),injectBefore:a.injectBefore.bind(a),setErrorHook:a.setError.bind(a)};return c.forEach(function(t){f[t]=function(){var e=(0,o.default)(r.default.mark(function e(o,u,c){return r.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",a[t](i,o,u,c));case 1:case"end":return e.stop()}},e,n)}));return function(t,n,r){return e.apply(this,arguments)}}()}),f}var x={conf:{credentials:"include",baseUrl:"/api",headers:{Accept:"application/json"}},before:[function(t){var e=(0,f.default)(t,2),n=e[0],r=e[1];console.log("hook1",n,r)},function(t){var e=(0,f.default)(t,2),n=e[0],r=e[1];console.log("hook2",n,r)}],after:[function(t){console.log("after hook1",t)}],timeout:5e3};_.HttpError=m,_.HTTP_ERROR_MAP={HTTP_STATUS_ERROR:"服务器未正常响应",REQUEST_TIMEOUT:"请求超时",TOKEN_EXPIRE:"token校验失效",RESPONSE_PARSING_FAILED:"reponse解析出错"},_.httpConfig=x,t.exports=_},function(t,e,n){t.exports=n(47)},function(t,e,n){var r=function(){return this}()||Function("return this")(),o=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,i=o&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,t.exports=n(48),o)r.regeneratorRuntime=i;else try{delete r.regeneratorRuntime}catch(t){r.regeneratorRuntime=void 0}},function(t,e){!function(e){"use strict";var n,r=Object.prototype,o=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},u=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",a=i.toStringTag||"@@toStringTag",s="object"==typeof t,f=e.regeneratorRuntime;if(f)s&&(t.exports=f);else{(f=e.regeneratorRuntime=s?t.exports:{}).wrap=x;var l="suspendedStart",p="suspendedYield",h="executing",v="completed",d={},y={};y[u]=function(){return this};var m=Object.getPrototypeOf,g=m&&m(m(L([])));g&&g!==r&&o.call(g,u)&&(y=g);var _=E.prototype=b.prototype=Object.create(y);O.prototype=_.constructor=E,E.constructor=O,E[a]=O.displayName="GeneratorFunction",f.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===O||"GeneratorFunction"===(e.displayName||e.name))},f.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,a in t||(t[a]="GeneratorFunction")),t.prototype=Object.create(_),t},f.awrap=function(t){return{__await:t}},T(S.prototype),S.prototype[c]=function(){return this},f.AsyncIterator=S,f.async=function(t,e,n,r){var o=new S(x(t,e,n,r));return f.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},T(_),_[a]="Generator",_[u]=function(){return this},_.toString=function(){return"[object Generator]"},f.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},f.values=L,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(R),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,o){return c.type="throw",c.arg=t,e.next=r,o&&(e.method="next",e.arg=n),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var u=this.tryEntries[i],c=u.completion;if("root"===u.tryLoc)return r("end");if(u.tryLoc<=this.prev){var a=o.call(u,"catchLoc"),s=o.call(u,"finallyLoc");if(a&&s){if(this.prev<u.catchLoc)return r(u.catchLoc,!0);if(this.prev<u.finallyLoc)return r(u.finallyLoc)}else if(a){if(this.prev<u.catchLoc)return r(u.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<u.finallyLoc)return r(u.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var u=i?i.completion:{};return u.type=t,u.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(u)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),R(n),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;R(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:L(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),d}}}function x(t,e,n,r){var o=e&&e.prototype instanceof b?e:b,i=Object.create(o.prototype),u=new k(r||[]);return i._invoke=function(t,e,n){var r=l;return function(o,i){if(r===h)throw new Error("Generator is already running");if(r===v){if("throw"===o)throw i;return M()}for(n.method=o,n.arg=i;;){var u=n.delegate;if(u){var c=j(u,n);if(c){if(c===d)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var a=w(t,e,n);if("normal"===a.type){if(r=n.done?v:p,a.arg===d)continue;return{value:a.arg,done:n.done}}"throw"===a.type&&(r=v,n.method="throw",n.arg=a.arg)}}}(t,n,u),i}function w(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}function b(){}function O(){}function E(){}function T(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function S(t){var e;this._invoke=function(n,r){function i(){return new Promise(function(e,i){!function e(n,r,i,u){var c=w(t[n],t,r);if("throw"!==c.type){var a=c.arg,s=a.value;return s&&"object"==typeof s&&o.call(s,"__await")?Promise.resolve(s.__await).then(function(t){e("next",t,i,u)},function(t){e("throw",t,i,u)}):Promise.resolve(s).then(function(t){a.value=t,i(a)},u)}u(c.arg)}(n,r,e,i)})}return e=e?e.then(i,i):i()}}function j(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,j(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=w(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function R(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function L(t){if(t){var e=t[u];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,i=function e(){for(;++r<t.length;)if(o.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=n,e.done=!0,e};return i.next=i}}return{next:M}}function M(){return{value:n,done:!0}}}(function(){return this}()||Function("return this")())},function(t,e,n){"use strict";e.__esModule=!0;var r=function(t){return t&&t.__esModule?t:{default:t}}(n(28));e.default=function(t){return function(){var e=t.apply(this,arguments);return new r.default(function(t,n){return function o(i,u){try{var c=e[i](u),a=c.value}catch(t){return void n(t)}if(!c.done)return r.default.resolve(a).then(function(t){o("next",t)},function(t){o("throw",t)});t(a)}("next")})}}},function(t,e,n){n(51),n(17),n(25),n(65),n(76),n(77),t.exports=n(0).Promise},function(t,e){},function(t,e,n){var r=n(18),o=n(19);t.exports=function(t){return function(e,n){var i,u,c=String(o(e)),a=r(n),s=c.length;return a<0||a>=s?t?"":void 0:(i=c.charCodeAt(a))<55296||i>56319||a+1===s||(u=c.charCodeAt(a+1))<56320||u>57343?t?c.charAt(a):i:t?c.slice(a,a+2):u-56320+(i-55296<<10)+65536}}},function(t,e,n){t.exports=!n(6)&&!n(12)(function(){return 7!=Object.defineProperty(n(21)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(9);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){t.exports=n(5)},function(t,e,n){"use strict";var r=n(31),o=n(30),i=n(23),u={};n(5)(u,n(2)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(8),o=n(4),i=n(14);t.exports=n(6)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),c=u.length,a=0;c>a;)r.f(t,n=u[a++],e[n]);return t}},function(t,e,n){var r=n(13),o=n(15),i=n(59)(!1),u=n(22)("IE_PROTO");t.exports=function(t,e){var n,c=o(t),a=0,s=[];for(n in c)n!=u&&r(c,n)&&s.push(n);for(;e.length>a;)r(c,n=e[a++])&&(~i(s,n)||s.push(n));return s}},function(t,e,n){var r=n(15),o=n(33),i=n(60);t.exports=function(t){return function(e,n,u){var c,a=r(e),s=o(a.length),f=i(u,s);if(t&&n!=n){for(;s>f;)if((c=a[f++])!=c)return!0}else for(;s>f;f++)if((t||f in a)&&a[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(18),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(13),o=n(24),i=n(22)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){"use strict";var r=n(63),o=n(64),i=n(7),u=n(15);t.exports=n(29)(Array,"Array",function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){"use strict";var r,o,i,u,c=n(20),a=n(1),s=n(10),f=n(26),l=n(3),p=n(9),h=n(11),v=n(66),d=n(67),y=n(39),m=n(40).set,g=n(71)(),_=n(27),x=n(41),w=n(72),b=n(42),O=a.TypeError,E=a.process,T=E&&E.versions,S=T&&T.v8||"",j=a.Promise,P="process"==f(E),R=function(){},k=o=_.f,L=!!function(){try{var t=j.resolve(1),e=(t.constructor={})[n(2)("species")]=function(t){t(R,R)};return(P||"function"==typeof PromiseRejectionEvent)&&t.then(R)instanceof e&&0!==S.indexOf("6.6")&&-1===w.indexOf("Chrome/66")}catch(t){}}(),M=function(t){var e;return!(!p(t)||"function"!=typeof(e=t.then))&&e},A=function(t,e){if(!t._n){t._n=!0;var n=t._c;g(function(){for(var r=t._v,o=1==t._s,i=0,u=function(e){var n,i,u,c=o?e.ok:e.fail,a=e.resolve,s=e.reject,f=e.domain;try{c?(o||(2==t._h&&N(t),t._h=1),!0===c?n=r:(f&&f.enter(),n=c(r),f&&(f.exit(),u=!0)),n===e.promise?s(O("Promise-chain cycle")):(i=M(n))?i.call(n,a,s):a(n)):s(r)}catch(t){f&&!u&&f.exit(),s(t)}};n.length>i;)u(n[i++]);t._c=[],t._n=!1,e&&!t._h&&F(t)})}},F=function(t){m.call(a,function(){var e,n,r,o=t._v,i=I(t);if(i&&(e=x(function(){P?E.emit("unhandledRejection",o,t):(n=a.onunhandledrejection)?n({promise:t,reason:o}):(r=a.console)&&r.error&&r.error("Unhandled promise rejection",o)}),t._h=P||I(t)?2:1),t._a=void 0,i&&e.e)throw e.v})},I=function(t){return 1!==t._h&&0===(t._a||t._c).length},N=function(t){m.call(a,function(){var e;P?E.emit("rejectionHandled",t):(e=a.onrejectionhandled)&&e({promise:t,reason:t._v})})},C=function(t){var e=this;e._d||(e._d=!0,(e=e._w||e)._v=t,e._s=2,e._a||(e._a=e._c.slice()),A(e,!0))},U=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw O("Promise can't be resolved itself");(e=M(t))?g(function(){var r={_w:n,_d:!1};try{e.call(t,s(U,r,1),s(C,r,1))}catch(t){C.call(r,t)}}):(n._v=t,n._s=1,A(n,!1))}catch(t){C.call({_w:n,_d:!1},t)}}};L||(j=function(t){v(this,j,"Promise","_h"),h(t),r.call(this);try{t(s(U,this,1),s(C,this,1))}catch(t){C.call(this,t)}},(r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=n(73)(j.prototype,{then:function(t,e){var n=k(y(this,j));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=P?E.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&A(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),i=function(){var t=new r;this.promise=t,this.resolve=s(U,t,1),this.reject=s(C,t,1)},_.f=k=function(t){return t===j||t===u?new i(t):o(t)}),l(l.G+l.W+l.F*!L,{Promise:j}),n(23)(j,"Promise"),n(74)("Promise"),u=n(0).Promise,l(l.S+l.F*!L,"Promise",{reject:function(t){var e=k(this);return(0,e.reject)(t),e.promise}}),l(l.S+l.F*(c||!L),"Promise",{resolve:function(t){return b(c&&this===u?j:this,t)}}),l(l.S+l.F*!(L&&n(75)(function(t){j.all(t).catch(R)})),"Promise",{all:function(t){var e=this,n=k(e),r=n.resolve,o=n.reject,i=x(function(){var n=[],i=0,u=1;d(t,!1,function(t){var c=i++,a=!1;n.push(void 0),u++,e.resolve(t).then(function(t){a||(a=!0,n[c]=t,--u||r(n))},o)}),--u||r(n)});return i.e&&o(i.v),n.promise},race:function(t){var e=this,n=k(e),r=n.reject,o=x(function(){d(t,!1,function(t){e.resolve(t).then(n.resolve,r)})});return o.e&&r(o.v),n.promise}})},function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var r=n(10),o=n(68),i=n(69),u=n(4),c=n(33),a=n(38),s={},f={};(e=t.exports=function(t,e,n,l,p){var h,v,d,y,m=p?function(){return t}:a(t),g=r(n,l,e?2:1),_=0;if("function"!=typeof m)throw TypeError(t+" is not iterable!");if(i(m)){for(h=c(t.length);h>_;_++)if((y=e?g(u(v=t[_])[0],v[1]):g(t[_]))===s||y===f)return y}else for(d=m.call(t);!(v=d.next()).done;)if((y=o(d,g,v.value,e))===s||y===f)return y}).BREAK=s,e.RETURN=f},function(t,e,n){var r=n(4);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&r(i.call(t)),e}}},function(t,e,n){var r=n(7),o=n(2)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var r=n(1),o=n(40).set,i=r.MutationObserver||r.WebKitMutationObserver,u=r.process,c=r.Promise,a="process"==n(16)(u);t.exports=function(){var t,e,n,s=function(){var r,o;for(a&&(r=u.domain)&&r.exit();t;){o=t.fn,t=t.next;try{o()}catch(r){throw t?n():e=void 0,r}}e=void 0,r&&r.enter()};if(a)n=function(){u.nextTick(s)};else if(!i||r.navigator&&r.navigator.standalone)if(c&&c.resolve){var f=c.resolve(void 0);n=function(){f.then(s)}}else n=function(){o.call(r,s)};else{var l=!0,p=document.createTextNode("");new i(s).observe(p,{characterData:!0}),n=function(){p.data=l=!l}}return function(r){var o={fn:r,next:void 0};e&&(e.next=o),t||(t=o,n()),e=o}}},function(t,e,n){var r=n(1).navigator;t.exports=r&&r.userAgent||""},function(t,e,n){var r=n(5);t.exports=function(t,e,n){for(var o in e)n&&t[o]?t[o]=e[o]:r(t,o,e[o]);return t}},function(t,e,n){"use strict";var r=n(1),o=n(0),i=n(8),u=n(6),c=n(2)("species");t.exports=function(t){var e="function"==typeof o[t]?o[t]:r[t];u&&e&&!e[c]&&i.f(e,c,{configurable:!0,get:function(){return this}})}},function(t,e,n){var r=n(2)("iterator"),o=!1;try{var i=[7][r]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],u=i[r]();u.next=function(){return{done:n=!0}},i[r]=function(){return u},t(i)}catch(t){}return n}},function(t,e,n){"use strict";var r=n(3),o=n(0),i=n(1),u=n(39),c=n(42);r(r.P+r.R,"Promise",{finally:function(t){var e=u(this,o.Promise||i.Promise),n="function"==typeof t;return this.then(n?function(n){return c(e,t()).then(function(){return n})}:t,n?function(n){return c(e,t()).then(function(){throw n})}:t)}})},function(t,e,n){"use strict";var r=n(3),o=n(27),i=n(41);r(r.S,"Promise",{try:function(t){var e=o.f(this),n=i(t);return(n.e?e.reject:e.resolve)(n.v),e.promise}})},function(t,e,n){t.exports={default:n(79),__esModule:!0}},function(t,e,n){n(80),t.exports=n(0).Object.keys},function(t,e,n){var r=n(24),o=n(14);n(81)("keys",function(){return function(t){return o(r(t))}})},function(t,e,n){var r=n(3),o=n(0),i=n(12);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],u={};u[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",u)}},function(t,e,n){t.exports={default:n(83),__esModule:!0}},function(t,e,n){var r=n(0),o=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},function(t,e,n){n(85),t.exports=n(0).Object.assign},function(t,e,n){var r=n(3);r(r.S+r.F,"Object",{assign:n(86)})},function(t,e,n){"use strict";var r=n(14),o=n(87),i=n(44),u=n(24),c=n(32),a=Object.assign;t.exports=!a||n(12)(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=a({},t)[n]||Object.keys(a({},e)).join("")!=r})?function(t,e){for(var n=u(t),a=arguments.length,s=1,f=o.f,l=i.f;a>s;)for(var p,h=c(arguments[s++]),v=f?r(h).concat(f(h)):r(h),d=v.length,y=0;d>y;)l.call(h,p=v[y++])&&(n[p]=h[p]);return n}:a},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){"use strict";e.__esModule=!0;var r=function(t){return t&&t.__esModule?t:{default:t}}(n(43));e.default=r.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}},function(t,e,n){"use strict";e.__esModule=!0;var r=i(n(90)),o=i(n(93));function i(t){return t&&t.__esModule?t:{default:t}}e.default=function(){return function(t,e){if(Array.isArray(t))return t;if((0,r.default)(Object(t)))return function(t,e){var n=[],r=!0,i=!1,u=void 0;try{for(var c,a=(0,o.default)(t);!(r=(c=a.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(t){i=!0,u=t}finally{try{!r&&a.return&&a.return()}finally{if(i)throw u}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},function(t,e,n){t.exports={default:n(91),__esModule:!0}},function(t,e,n){n(25),n(17),t.exports=n(92)},function(t,e,n){var r=n(26),o=n(2)("iterator"),i=n(7);t.exports=n(0).isIterable=function(t){var e=Object(t);return void 0!==e[o]||"@@iterator"in e||i.hasOwnProperty(r(e))}},function(t,e,n){t.exports={default:n(94),__esModule:!0}},function(t,e,n){n(25),n(17),t.exports=n(95)},function(t,e,n){var r=n(4),o=n(38);t.exports=n(0).getIterator=function(t){var e=o(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return r(e.call(t))}},function(t,e,n){t.exports={default:n(97),__esModule:!0}},function(t,e,n){n(98),t.exports=n(0).Object.entries},function(t,e,n){var r=n(3),o=n(99)(!0);r(r.S,"Object",{entries:function(t){return o(t)}})},function(t,e,n){var r=n(14),o=n(15),i=n(44).f;t.exports=function(t){return function(e){for(var n,u=o(e),c=r(u),a=c.length,s=0,f=[];a>s;)i.call(u,n=c[s++])&&f.push(t?[n,u[n]]:u[n]);return f}}},function(t,e,n){"use strict";e.__esModule=!0;var r=function(t){return t&&t.__esModule?t:{default:t}}(n(101));e.default=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),(0,r.default)(t,o.key,o)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}()},function(t,e,n){t.exports={default:n(102),__esModule:!0}},function(t,e,n){n(103);var r=n(0).Object;t.exports=function(t,e,n){return r.defineProperty(t,e,n)}},function(t,e,n){var r=n(3);r(r.S+r.F*!n(6),"Object",{defineProperty:n(8).f})},function(t,e,n){t.exports={default:n(105),__esModule:!0}},function(t,e,n){n(106);var r=n(0).Object;t.exports=function(t,e){return r.create(t,e)}},function(t,e,n){var r=n(3);r(r.S,"Object",{create:n(31)})},function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){t.exports="object"==typeof self?self.FormData:window.FormData}])});