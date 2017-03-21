import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'
import { notification } from 'antd'
import API from 'api'

const SESSION_USER_FULFILLED = Symbol('SESSION_USER_FULFILLED')
const SESSION_USER_LOGOUT = Symbol('SESSION_USER_LOGOUT')

const success = createAction(SESSION_USER_FULFILLED)
const logout = createAction(SESSION_USER_LOGOUT)


const login = function (credentials) {
  return function (dispatch, getState, { API }) {
    //return new Promise((resolve, reject) => {
    return API('login')
      .post(credentials)
      .then((data) => {
        dispatch(success(data))
        dispatch(push('/'))
      })
    //.catch(reject)
    //})
  }
}

const checkLicense = function (module) {
  return function (dispatch, getState) {
    let isLicenseValid = false;
    const licenses = getState().session.licenses || [];
    licenses.forEach((license) => {
      if (license.name == module) {
        isLicenseValid = Date.parse(license["expires-on"]) > Date.parse(new Date());
        return;
      }
    })
    return isLicenseValid;
  }
}

export { login, logout, checkLicense }

const defaultState = {
  "username": "m.diener@gomogi.com",
  "licenses": [
    { "expires-on": "2017-05-27", "name": "BioTrace", "license": "d804b6ae06fed9bbe8a4174cbf1b5e092ef98753" },
    { "expires-on": "2017-06-17", "name": "DemoApp2", "license": "4846ae1cd14e768942d86ccf14c1f55d7c107c0b" }
  ],
  token: "479bf16ecba43727c5d119fa09e14d8475432b4f"
}

const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SESSION_USER_FULFILLED:
      return {
        ...state,
        ...payload
      }
    case SESSION_USER_LOGOUT:
      return defaultState
    default:
      return state;
  }
}


const reducers = { session: reducer }

export { reducers }
