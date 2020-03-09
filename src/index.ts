import HttpError from "./HttpError"
import HttpClient from './HttpClient'
import 'whatwg-fetch'
import { IHttpClient } from "VFetch"


const VFetch = (option, instance): IHttpClient => {
  const http = instance || fetch
  const { allow = ['get', 'post', 'put', 'delete', 'option', 'download', 'upload'] } = option
  const clientWrapper = new HttpClient({
    ...option,
    isNode: !!instance,
  })
  const client = {
    injectAfter: clientWrapper.injectAfter.bind(clientWrapper),
    injectBefore: clientWrapper.injectBefore.bind(clientWrapper),
    setErrorHook: clientWrapper.setError.bind(clientWrapper),
    setOption: clientWrapper.setOption.bind(clientWrapper),
  }
  const allowMethod = allow

  allowMethod.forEach(m => {
    client[m] = async (url, params, opt) => clientWrapper[m](http, url, params, opt)
  })

  return client
}

VFetch.HttpError = HttpError

// export default VFetch

module.exports = VFetch
