import { createAction } from 'redux-actions'

import API from 'api'

const SESSION_USER_FETCH = Symbol('SESSION_USER_FETCH')
const SESSION_USER_FULFILLED = Symbol('SESSION_USER_FULFILLED')

export { SESSION_USER_FETCH, SESSION_USER_FULFILLED }

//const login = createAction(SESSION_USER_FETCH)
const success = createAction(SESSION_USER_FULFILLED)

const login = function(credentials) {
  return function(dispatch, getState, { API }) {
    //return new Promise((resolve, reject) => {
    return API('profiles/login')
        .post(credentials)
        //.then(resolve)
        //.catch(reject)
    //})
  }
}

export { login }

const defaultState = {
  token: null,
  user: {}
}

function reducer(state = defaultState, {type, payload}) {
  switch (type) {
    case SESSION_USER_FULFILLED:
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
}

/*function epic(action$) {
  return action$.ofType(SESSION_USER_FETCH)
    //.delay(2000) // Asynchronously wait 1000ms then continue
    .mergeMap(action =>
      API('profiles/login')
        .post(action.payload)
        .catch(err=> { throw err })
        .map(success)
    );
}*/

const reducers = {session: reducer}
//const epics = [epic]

export { reducers/*, epics*/ }
