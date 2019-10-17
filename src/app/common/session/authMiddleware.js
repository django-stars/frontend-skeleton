import api from 'api'
import { reset } from 'ds-resource'
import { SubmissionError } from 'redux-form'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
const LOGOUT_ACTION = 'LOGOUT_ACTION'

const nonFieldErrorKeys = ['non_field_errors', 'nonFieldErrors', 'detail']

export default function authMiddleware(store) {
  api.interceptors.response.use({
    onError: function({ data, response }) {
      if(get(response, 'status') === 401) {
        store.dispatch(logout())
        throw new Error(response.statusText)
      }
      if(!isEmpty(data)) {
        const errors = Object.entries(data || {}).reduce(function(res, [key, value]) {
          let eKey = key
          if(nonFieldErrorKeys.includes(key)) {
            eKey = '_error'
          }
          return {
            ...res,
            [eKey]: Array.isArray(value) ? value[0] : value,
          }
        }, {})
        throw new SubmissionError(errors)
      }
      if(get(response, 'status') === 401) {
        store.dispatch(logout())
      }
      return Promise.reject({ error: get(data, 'message', response.statusText) })
    },
  })

  let removeRequestInterceptor
  return (next) => action => {
    const token = get(store.getState(), 'session.data.token')

    if(action.type === LOGOUT_ACTION) {
      removeRequestInterceptor && removeRequestInterceptor()
      return next(action)
    }

    const nextToken = get(action, 'payload.data.token') || get(action, 'payload.session.data.token')
    if(nextToken !== token && nextToken) {
      removeRequestInterceptor && removeRequestInterceptor()
      removeRequestInterceptor = api.interceptors.request.use({
        onSuccess: (consfigs) => {
          const headers = new Headers(consfigs.headers)
          headers.set('Authorization', `JWT ${nextToken}`)
          return {
            ...consfigs,
            headers,
          }
        },
      })
    }
    return next(action)
  }
}


export function logout() {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_ACTION,
    })
    dispatch(reset())
  }
}
