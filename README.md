# vFetch

## 安装

```bash
npm install venus-fetch
```

## 使用

```javascript
import VFetch from 'venus-fetch'

const http = VFetch(opt)
```

## 初始化配置
```javascript
const httpConfig = {
  conf: {
    credentials: 'include',
    baseUrl: '/api',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
    },
  },
  before: [
    ([url, opt]) => {
      console.log('hook1', url, opt)
    },
    ([url, opt]) => {
      console.log('hook2', url, opt)
    },
  ],
  after: [
    (rsp) => {
      console.log('after hook1', rsp)
    },
  ],
  timeout: 5000,
}
```

| 配置 | 说明 | 默认值 | 其它 |
| - | - | - | - |
| allow | client 允许的请求类型 | ['get', 'post', 'put', 'delete', 'option'] | 可选 |
| before | 前置钩子(钩子数组) | []| 可选 | 
| after | 后置钩子(钩子数组) | [] | 可选 | 
| conf | fetch配置项 | | 参考fetch api 文档 |
| error | 全局错误处理函数 | null | 可选 |

## 方法

+ get(url, [parmas], [options]) // 基于初始化配置的 allow
+ post(url, [parmas], [options])  // 基于初始化配置的 allow
+ put(url, [parmas], [options]) // 基于初始化配置的 allow
+ delete(url, [parmas], [options]) // 基于初始化配置的 allow
+ option(url, [parmas], [options]) // 基于初始化配置的 allow
+ setErrorHook(func) 设置全局错误处理器
+ injectBefore(func) 增加前置拦截器
+ injectAfter(func) 增加后置拦截器

**具体请求方法中携带的```options```中提供了```type```字段，可选 ```[download/upload]```,分别对应了上传文件和下载文件流的操作,```type:upload```时，将会把请求头中的```Content-Type```设置为```undefined```；```type:download```时，将会把```response```进行```response.blob()```操作**

## 内置error code

+ HTTP_STATUS_ERROR - 服务器未正常响应
+ REQUEST_TIMEOUT - 请求超时
+ TOKEN_EXPIRE - token校验失败
+ RESPONSE_PARSING_FAILED - reponse 解析出错

## injectAfter function

如果injectAfter function有返回值且返回值是HttpError的实例的话，当前请求的promise会被reject，
这次请求的失败信息将也会触发onError事件。

### 例子

```javascript
http.injectAfter(function(rsp){
  // do some response check

  return new vFetch.HttpError({
    code: '001',
    message: 'error test',
    httpStatus: null,
  })
})
```

## Content-Type

为了方便使用，下面这几种情况下vFetch会根据content-type去自动设置request body的类型，
处理body对象的构建

+ application/x-www-form-urlencoded (默认) 如果传入的params是object类型，则自动构建请求body
+ multipart/form-data 自动根据请求的parmas object 构建 FromData对象
+ application/json 如果传入的params是object类型，则自动转换成JsonString，如果为string类型，则直接用传入的params

请求的params为FormData类型时，request的body不会进行自动转换

## httpError 

### 构造函数

httpError实例的构造函数为 vFetch.HttpError

### 示例

```javascript
{
  code: "TOKEN_EXPIRE"
  httpStatus: 401
  message: "用户认证失败"
}
```

## 示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src="../dist/vFetch.js"></script>
</head>
<body>
  <script>
    console.log(window, VFetch.HttpError, VFetch.HTTP_ERROR_MAP, VFetch.httpConfig)
    const http = VFetch(VFetch.httpConfig)

    http.injectAfter(function(rst){
      console.log('injectAfter', rst)
      return new vFetch.HttpError({
        code: '001',
        message: 'error test',
        httpStatus: null,
      })
    })
    http.injectAfter(function(){
      console.log(222);
    })
    http.setErrorHook(function(e){
      console.log(e, 'error');
    })

    http.get('t.json', {a:2, c:3})
      .then(rst => {
        //console.log(rst, 'success');
      }).catch(e => {
        //console.log(e, 'error');
      })
  </script> 
</body>
</html>
```

