import { push } from 'react-router-redux'
import { SubmissionError } from 'redux-form'
import keys from 'lodash/keys'
import { logout } from 'modules/session'

var store

// FIXME make it as middleware
export function configure(s) { store = s }

export default function(endpoint) {
  return new API(endpoint)
}

class API {
  constructor(endpoint) {
    this.endpoint = endpoint
  }

  request(method = 'GET', data = null, options = {}) {
    const authToken = store.getState().session.token
    const Authorization = authToken ? 'JWT ' + authToken : ''

    let headers = {
      'Content-Type': 'application/json',
      Authorization,
    }

    if (options.isFormData) {
      let {
        ['Content-Type']: toDelete, ...newHeaders
      } = headers
      headers = newHeaders
      var formData = new FormData()

      for (var name in data) {
        formData.append(name, data[name])
      }
    }

    return fetch(
        `/api/v1/${this.endpoint}`,
      {
        method,
        body: data ? (options.isFormData ? formData : JSON.stringify(data)) : undefined,
        headers,
      }
      )
      .then(response => {
        if (response.status === 401) {
          store.dispatch(logout())
          store.dispatch(push('auth/login/'))
          window.location.reload()
          return response
        }

        if (response.status === 403) {
          store.dispatch(push('auth/login/'))
          return response
        }

        if (response.status === 404) {
          store.dispatch(push('/404/'))
          return response
        }

        if (response.status === 500) {
          return response
        }

        if (response.headers.get('Content-Type') !== 'application/json') {
          return ''
        }

        return response.json()
          .then(function(body) {
            if (response.ok) {
              return body
            }

            // handle errors
            var errors = {}
            keys(body).forEach(key => {
              let eKey = key
              if (key === 'non_field_errors' || key === 'detail' || key === 'errors') {
                eKey = '_error'
              }
              if (Array.isArray(body[key])) {
                errors[eKey] = body[key][0]
              } else {
                errors[eKey] = body[key]
              }
            })
            throw new SubmissionError(errors)
          })
      })
  }

  postAsFormData(data) {
    return this.request('POST', data, { isFormData: true })
  }

  patchAsFormData(data) {
    return this.request('PATCH', data, { isFormData: true })
  }

  post(data) {
    return this.request('POST', data)
  }

  delete(data) {
    return this.request('DELETE', data)
  }

  patch(data) {
    return this.request('PATCH', data)
  }

  put(data) {
    return this.request('PUT', data)
  }

  get() {
    return this.request()
  }
}
