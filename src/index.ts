import HttpError from './HttpError'
import 'whatwg-fetch'
import { IVFetch, Options, RequestOptions } from 'VFetch'
import Client from './Client'

const VFetch = (option: Options, instance: any): IVFetch => {
  const http = instance || window.fetch || fetch
  const { allow = ['get', 'post', 'put', 'delete', 'download', 'upload'] } = option
  const clientWrapper = new Client(option)
  const client = {
    injectAfter: clientWrapper.injectAfter.bind(clientWrapper),
    injectBefore: clientWrapper.injectBefore.bind(clientWrapper),
    setErrorHook: clientWrapper.setError.bind(clientWrapper),
    setOption: clientWrapper.setOption.bind(clientWrapper),
  }

  allow.forEach((m: string) => {
    client[m] = async (url: String, params: any, opt: RequestOptions) => clientWrapper[m](http, url, params, opt)
  })

  return client
}

VFetch.HttpError = HttpError

module.exports = VFetch
