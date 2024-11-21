import api from 'api'
import get from 'lodash/get'
import { logout, LOGOUT_ACTION } from 'store/session'

export default function authMiddleware(store) {
  api.interceptors.response.use({
    onError: function({ data, response }) {
      if(get(response, 'status') === 401) {
        store.dispatch(logout())
        throw new Error(response.statusText)
      }

      return { data, response }
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
        onSuccess: (configs) => {
          const headers = new Headers(configs.headers)
          headers.set('Authorization', `JWT ${nextToken}`)
          return {
            ...configs,
            headers,
          }
        },
      })
    }

    return next(action)
  }
}
