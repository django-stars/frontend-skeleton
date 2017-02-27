'use strict';

// TODO try to use separate entry point for CSS in webpack config
import '../sass/app.sass';

import 'babel-polyfill';

// TODO where we should to import this, or should we import all rxjs operators ?
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import reduce from 'lodash/reduce'
import extend from 'lodash/extend'
import union from 'lodash/union'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { epics as sessionEpics, reducers as sessionReducers } from 'modules/session'
import { reducer as form } from 'redux-form'
import createLogger from 'redux-logger'

import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer as routing, routerMiddleware } from 'react-router-redux'

import routes from './routes'
import { configure as configureAPI } from 'api'

const epicMiddleware = createEpicMiddleware(
  combineEpics(...union(
    // your epics here
    sessionEpics,
  ))
)

const store = createStore(
  combineReducers(reduce([
    // your reducers here
    sessionReducers,
    {
      routing,
      form
    },
  ], extend)),
  applyMiddleware(
    epicMiddleware,
    routerMiddleware(browserHistory),
    createLogger()
  )
);

configureAPI(store)
window.store = store

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('root')
)
