import 'polyfills' // should be first
import '../styles/index.scss'
import { createStore, applyMiddleware, combineReducers, compose as reduxCompose } from 'redux'
import { reducer as form } from 'redux-form'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import omit from 'lodash/omit'
import { middleware as cacheMiddleware, state as initialState } from 'store/cache-middleware'
import { reducers, epics } from 'store'
import { reducer as resource, epic as resourceEpic } from 'common/utils/resource'
import API, { configure as configureAPI } from 'api'
import * as Sentry from '@sentry/browser'
import createSentryMiddleware from 'redux-sentry-middleware'

if(process.env.SENTRY_DNS) {
  Sentry.init({ dsn: process.env.SENTRY_DNS })
}


// support for redux dev tools
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose

const store = createStore(
  combineReducers({
    form,
    resource,
    ...reducers,
  }),
  initialState,
  compose(
    applyMiddleware(...[
      createEpicMiddleware(combineEpics(...epics, resourceEpic), { dependencies: { API } }),
      cacheMiddleware,
      process.env.SENTRY_DNS && createSentryMiddleware(Sentry, {
        stateTransformer: (state) => { return omit(state, 'session') },
      }),
    ].filter(Boolean))
  )
)

// FIXME API should not need store
configureAPI(store)

export default store
