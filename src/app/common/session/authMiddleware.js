import api from 'api'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { LOGOUT_ACTION } from 'store/session'

export default function authMiddleware(store) {
  api.interceptors.response.use({
    onError: function({ data, response }) {
      if(get(response, 'status') === 401) {
        store.dispatch(logout())
        throw new Error(response.statusText)
      }
      if(!isEmpty(data)) {
        throw data
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
