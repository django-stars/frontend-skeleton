import isEmpty from 'lodash/isEmpty'
import fetch, { Headers, Request } from 'node-fetch'


var languageCode

// FIXME make it as middleware
export function setLanguageCode(code) { languageCode = code }

export default function(endpoint) {
  return new API(endpoint)
}

export const queue = new Set()

export class API {
  constructor({ baseURL, queryFuntion }) {
    this.baseURL = baseURL
    this.queryFuntion = queryFuntion
  }

  prepareBody(body) {
    return isEmpty(body) ? body : JSON.stringify(body)
  }

  handleResponseCallback(response) {
    if(response.status === 401) {
      // 401 (Unauthorized)
      // eslint-disable-next-line no-throw-literal
      throw { status: 401, type: 'redirect', message: response.status }
    } else if(response.status === 204) {
      // 204 (No Content)
      return Promise.resolve({})
    } else if(response.status === 500) {
      // eslint-disable-next-line no-throw-literal
      throw { status: 500, type: 'redirect', message: 'Server error' }
    } else if(response.status === 404) {
      // eslint-disable-next-line no-throw-literal
      throw { status: 404, type: 'redirect', message: 'Not found' }
    }

    if(response.headers.get('Content-Type') !== 'application/json') {
      return Promise.reject(response)
    }

    return response.json()
      .then(function(body) {
        if(response.ok) {
          return body
        }

        return Promise.reject(body)
      })
  }

  request({ method, endpoint, body, params }) {
    if(!/^\w[^?]+\w$/.test(endpoint)) {
      console.error('invalid API endpoint: \'%s\'. API endpoint should not contain trailing slashes and query params', endpoint)
    }

    const queryParams = isEmpty(params) ? '' : '?' + this.queryFuntion.buildQueryParams(params)
    const resource = `${process.env.PROXY_URL}${this.baseURL}${endpoint}/${queryParams}`
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Accept-Language': languageCode || 'en',
    })

    body = method === 'GET' ? undefined : this.prepareBody(body)
    const options = {
      method,
      headers,
      body,
      credentials: 'omit',
    }
    var request = new Request(resource, options)

    let f

    console.log('[api][q] add', resource)
    queue.add(
      f = fetch(request)
        .then(this.handleResponseCallback)
        .catch(e => {
          console.error('[e][api] req failed ⬇️')
          console.error(e)
        })
        .finally(_ => {
          console.log('[api][q] done', resource)
          return queue.delete(f)
        })
    )

    return f
  }

  post(body = {}, params = {}) {
    return this.request('POST', params, body)
  }

  get(params) {
    return this.request('GET', params)
  }

  put(body = {}, params = {}) {
    return this.request('PUT', params, body)
  }

  patch(body = {}, params = {}) {
    return this.request('PATCH', params, body)
  }

  options() {
    return this.request('OPTIONS')
  }

  delete() {
    return this.request('DELETE')
  }
}
