// Dependencies
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { asyncRequestHandler } from '@/presentation/utils'

// Types
import type { APIResponse } from '@/domain/types'

// Fetch method
export async function requestServer(
  url: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete', 
  body?: {} | undefined,
  config?: AxiosRequestConfig<{}> | undefined
): Promise<AxiosResponse<any, APIResponse>> {

  // Retrieve base url
  const baseUrl: string = process.env.API_BASE_URL || '' as string
  const requestUrl = `${baseUrl}${url}`

  // Using axios to request async
  const response = await asyncRequestHandler(
    ['post', 'put', 'patch'].includes(method)
      ? axios[method](requestUrl, body, config)
      : axios[method](requestUrl, config)
  )

  // Return api response
  return response
}

// Fetch external api method (ex: Cloudinary, Correios)
export async function requestExternalApi(
  url: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete', 
  body?: {} | undefined,
  config?: AxiosRequestConfig<{}> | undefined
): Promise<AxiosResponse<any, APIResponse>> {

  // Using axios to request async
  const response = await asyncRequestHandler(
    ['post', 'put', 'patch'].includes(method)
      ? axios[method](url, body, config)
      : axios[method](url, config)
  )

  // Return api response
  return response
}

// Fetch Nextjs api
export async function requestClient(
  url: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete', 
  body?: {} | undefined,
  config?: AxiosRequestConfig<{}> | undefined
): Promise<AxiosResponse<any, APIResponse>> {

  // Retrieve base url
  const baseUrl: string = location.origin as string
  const requestUrl = `${baseUrl}${url}`
  
  // Using axios to request async
  const response = await asyncRequestHandler(
    ['post', 'put', 'patch'].includes(method)
      ? axios[method](requestUrl, body, config)
      : axios[method](requestUrl, config)
  )

  // Return api response
  return response
}
