import axios from 'axios'
import { reset, INIT_STORE } from 'djangostars/persist'
import { SubmissionError } from 'redux-form'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import keys from 'lodash/keys'
const LOGOUT_ACTION = 'LOGOUT_ACTION'

export default function authMiddleware(store) {
  axios.interceptors.response.use(
    function(response) {
      return response.data
      if(!response.headers.get('Content-Type').includes('application/json')) {
        return Promise.reject(response)
      }
    },
    function(error) {
      if(isEmpty(get(error, 'response'))) {
        return Promise.resolve({})
      }
      if(!isEmpty(get(error, 'response.data'))) {
        let errors = {}
        const body = get(error, 'response.data')
        keys(body).forEach(key => {
          let eKey = key
          if(key === 'non_field_errors' || key === 'nonFieldErrors' || key === 'detail') {
            eKey = '_error'
          }
          if(Array.isArray(body[key])) {
            errors[eKey] = body[key][0]
          } else {
            errors[eKey] = body[key]
          }
        })
        throw new SubmissionError(errors)
      }
      if(get(error, 'response.status') === 401) {
        store.dispatch(logout())
      }
      return Promise.reject(new Error(error.message))
    })

  return (next) => action => {
    const token = get(store.getState(), 'session.data.token')
    if(token !== axios.defaults.headers.common['Authorization']) {
      axios.defaults.headers.common['Authorization'] = token ? `JWT ${token}` : ''
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
