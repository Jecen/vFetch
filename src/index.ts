import HttpError from './HttpError'
import 'whatwg-fetch'
import { IVFetch, Options, RequestOptions } from 'VFetch'
import Client from './Client'

const VFetch = (option: Options, instance: any): IVFetch => {
  const http = instance || window.fetch || fetch
  const { allow = ['get', 'post', 'put', 'delete', 'download', 'upload', 'ossDownload'] } = option
  const clientWrapper = new Client(option)
  const client = {
    injectAfter: clientWrapper.injectAfter.bind(clientWrapper),
    injectBefore: clientWrapper.injectBefore.bind(clientWrapper),
    setErrorHook: clientWrapper.setError.bind(clientWrapper),
    setOption: clientWrapper.setOption.bind(clientWrapper),
  }

  allow.forEach((m: string) => {
    if (m === 'ossDownload') {
      client[m] = async (url: string, fileName: string) => clientWrapper[m](http, url, fileName)
    } else {
      client[m] = async (url: string, params: any, opt: RequestOptions) => clientWrapper[m](http, url, params, opt)
    }
  })

  return client
}

VFetch.HttpError = HttpError

module.exports = VFetch
