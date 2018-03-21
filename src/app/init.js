import 'polyfills' // should be first
import '../styles/index.scss'

import createHistory from 'history/createBrowserHistory'
import { routerReducer as router, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers, compose as reduxCompose } from 'redux'
import { reducer as form } from 'redux-form'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { middleware as cacheMiddleware, state as initialState } from './cache'
import { reducers, epics } from 'store'
// import API, { configure as configureAPI } from 'api'


const API = {}
const history = createHistory()

// support for redux dev tools
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose

const store = createStore(
  combineReducers({
    router,
    form,
    ...reducers,
  }),
  initialState,
  compose(
    applyMiddleware(
      createEpicMiddleware(combineEpics(...epics), { dependencies: { API } }),
      routerMiddleware(history),
      cacheMiddleware,
    )
  )
)

// FIXME why API need store ?
// configureAPI(store)

export {
  store, history,
}
