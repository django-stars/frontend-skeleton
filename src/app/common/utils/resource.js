import { Component } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { startSubmit, stopSubmit, setSubmitSucceeded, setSubmitFailed } from 'redux-form'
import { combineEpics } from 'redux-observable'

import { fromPromise } from 'rxjs/observable/fromPromise'
import { concat } from 'rxjs/observable/concat'
// import { interval } from 'rxjs/observable/interval'
import { of } from 'rxjs/observable/of'

import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/filter'

import pathToRegexp from 'path-to-regexp'

import merge from 'lodash/merge'
import values from 'lodash/values'

import { push } from 'react-router-redux'

// TODO
// + OPTIONS request
// + errors handling
// +/- metadata handling (loading, global loading, etc)
// global configuration
// submit only dirty
// caching (OPTIONS at least, also some resources can be cachable)
// + list
// + use uuid
// + endpoint generation (/name/:uuid, /name-:placeholder/)
// pagination, filters, withRouter
// debounce
// List and Item components
// HEAD request
// custom: actions, reducer, epics
// allowed methods

export const REQUEST = '@ds-resource/request'
export const FILTER = '@ds-resource/filter'
export const SET_DATA = '@ds-resource/set-data'
export const SET_ERRORS = '@ds-resource/set-errors'
export const SET_LOADING = '@ds-resource/set-loading'
export const SET_FILTERS = '@ds-resource/set-filters'

export function request(payload, meta) {
  return {
    type: REQUEST,
    meta,
    payload,
  }
}

export function setData(payload, meta) {
  return {
    type: SET_DATA,
    meta,
    payload,
  }
}

export function setErrors(payload, meta) {
  return {
    type: SET_ERRORS,
    meta,
    payload,
  }
}

export function setLoading(payload, meta) {
  return {
    type: SET_LOADING,
    meta,
    payload,
  }
}

export function setFilters(payload, meta) {
  return {
    type: SET_FILTERS,
    meta,
    payload,
  }
}

export function filter(payload, meta) {
  return {
    type: FILTER,
    meta,
    payload,
  }
}

export function selectResource(resource) {
  return function(state) {
    let resourceState = {
      // FIXME wrong place for default state
      data: null,
      options: null,
      isLoading: false,
      errors: null,
      loading: 0,
      filters: { ...resource.filters },
      ...state.resource[resource.namespace],
    }

    return resourceState
  }
}

// configuration:
// 1. GLOBAL
// 2. RESOURCE
// 3. CONNECT PHASE

export function connectResource(resource, options = {}) {
  // assert(resource, 'no resource set') // TODO

  resource = {
    // TODO global configuration
    // defaults
    idKey: 'uuid',
    prefetch: true,
    refresh: false,
    form: false,
    list: false,
    options: false,
    async: false,
    // pagination: Boolean(resource.list), // TODO is pagination enabled ?
    item: Boolean(options.form), // disallow binding list to form

    ...resource, // FIXME omit `item` here
    ...options,
  }

  resource.namespace = getNamespace(resource)

  const connectHOC = connect(
    // data
    selectResource(resource),
    // actions
    (dispatch, props) => {
      const meta = { resource, props }

      let actions = {
        create: makeRequestAction('POST', meta),
        fetch: makeRequestAction('GET', meta),
        update: makeRequestAction('PATCH', meta),
        remove: makeRequestAction('DELETE', meta),
        replace: makeRequestAction('PUT', meta),
        fetchOptions: makeRequestAction('OPTIONS', meta),

        filter: (payload, reset = false) => filter(payload, { ...meta, reset }),
        setData: payload => setData(payload, meta),
        setErrors: payload => setErrors(payload, meta),
        setFilters: payload => setFilters(payload, meta),
      }

      actions = {
        ...actions,
        // aliases // TODO
        save: actions.update,
      }

      return bindActionCreators(actions, dispatch)
    },

    // merge
    (stateProps, dispatchProps, ownProps) => {
      let props = ({
        ...ownProps,
        [resource.namespace]: {
          ...stateProps,
          ...dispatchProps,
        },
      })

      if(resource.form) {
        const isNew = !(
          // is list resource and ID presents
          (resource.list && ownProps[resource.idKey]) ||
          // not list ( single enpoint resource ) and we are doing prefetch (so the resource exists)
          (!resource.list && resource.prefetch)
        )
        props = {
          ...props,
          initialValues: stateProps.data,
          onSubmit: isNew ? dispatchProps.create : dispatchProps.update,
        }
      }

      return props
    },
  )

  if(!resource.prefetch) {
    return connectHOC
  }

  return compose(
    connectHOC,
    makePrefetchHOC(resource),
  )
}

export function connectFormResource(resource, options) {
  if(!options.form) {
    // TODO assert
    throw new Error('no form name. you must specify form name for connectFormResource')
  }
  return connectResource(resource, { ...options })
}

export function connectListResource(resource, options) {
  return connectResource(resource, { ...options, list: true })
}

export function connectSingleResource(resource, options) {
  return connectResource(resource, options)
}

function makePrefetchHOC(resource) {
  return function(ComposedComponent) {
    return class PrefetchResourceContainer extends Component {
      componentDidMount() {
        const hasData = this.props[resource.namespace].data !== null
        const hasOptions = this.props[resource.namespace].options !== null
        const hasId = Boolean(this.props[resource.idKey])

        if((!hasData || resource.refresh) && (!resource.list || !resource.item || hasId)) {
          // fetch item
          this.props[resource.namespace].fetch()
        } else if(!hasData) {
          // register item
          this.props[resource.namespace].setData({})
        }


        if(resource.options && !hasOptions) {
          this.props[resource.namespace].fetchOptions()
        }
      }

      render() {
        const hasData = this.props[resource.namespace].data !== null
        const hasOptions = this.props[resource.namespace].options !== null

        if(!resource.async && (!hasData || (resource.options && !hasOptions))) {
          return null // TODO loading
        }

        return <ComposedComponent {...this.props} />
      }
    }
  }
}

const defaultState = {
  isFetched: false,
}

export function reducer(state = defaultState, { type, payload = {}, meta = {}, error = false }) {
  switch (type) {
    case SET_ERRORS:
    case SET_DATA: {
      const currentData = state[meta.resource.namespace]
      const dataKey = {
        [SET_DATA]: meta.type === 'OPTIONS' ? 'options' : 'data',
        [SET_ERRORS]: 'errors',
      }[type]

      if(dataKey === 'options') {
        payload = parseOptions(payload)
      }

      let count
      if(dataKey === 'data' && meta.resource.list) {
        count = payload.results ? payload.count : payload.length
        payload = payload.results || payload
      }

      return {
        ...state,
        [meta.resource.namespace]: {
          ...currentData,
          count,
          [dataKey]: payload,
        },
      }
    }

    case SET_LOADING: {
      const currentData = state[meta.resource.namespace] || { loading: 0 }
      const loading = currentData.loading + payload

      if(loading < 0) {
        console.warn('loading counter actions are inconsistent')
      }

      return {
        ...state,
        [meta.resource.namespace]: {
          ...currentData,
          isLoading: loading > 0,
          loading,
        },
      }
    }

    case SET_FILTERS: {
      const currentData = state[meta.resource.namespace] || {}
      // FIXME we need INIT action
      // const filters = meta.reset ? {} : currentData.filters
      const filters = meta.reset ? {} : selectResource(meta.resource)({ resource: state }).filters

      return {
        ...state,
        [meta.resource.namespace]: {
          ...currentData,
          filters: { ...filters, ...payload },
        },
      }
    }
  }

  return state
}

function requestEpic(action$, store, { API }) { // FIXME API
  return action$.ofType(REQUEST)
    // .debounce(() => interval(100)) // FIXME: FAIL on different requests types
    .mergeMap(function({ meta, payload }) {
      const { type, props, resource } = meta

      const isListItem = resource.list && ['PATCH', 'REPLACE', 'DELETE'].includes(type)
      let itemId = (isListItem ? payload : props)[resource.idKey]

      let endpoint = resource.endpoint
      if(!(new RegExp(`:(${resource.idKey})\\W`, 'g').test(endpoint))) {
        // automatically set '/:id?' to endpoint
        endpoint += `/:${resource.idKey}?`
      }
      const toPath = pathToRegexp.compile(resource.endpoint)
      endpoint = toPath({ ...props, [resource.idKey]: itemId })
      const submitting = resource.form && ['POST', 'PATCH', 'PUT', 'DELETE'].includes(type)

      // FIXME need to find another way to get current filters
      const hasId = Boolean(props[resource.idKey])
      const query = resource.list && !hasId && !isListItem
        ? selectResource(resource)(store.getState()).filters
        : undefined

      return concat(
        of(
          setLoading(+1, meta),
          // TODO it seems we can move form-related actions to separate epic
          submitting && startSubmit(resource.form),
        ),
        fromPromise(API(endpoint).request(type, query, payload))
          .switchMap(response => of(
            isListItem
              ? request(undefined, { ...meta, type: 'GET' })
              : setData(response, meta),
            setLoading(-1, meta),
            submitting && stopSubmit(resource.form),
            submitting && setSubmitSucceeded(resource.form),
            submitting && meta.resource.navigateAfterSubmit && push(meta.resource.navigateAfterSubmit),
          ))
          .catch(err => of(
            setErrors(err.errors || err, meta),
            setLoading(-1, meta),
            submitting && stopSubmit(resource.form, err.errors || err),
            submitting && setSubmitFailed(resource.form), // TODO fields list
          ))
      ).filter(Boolean)
    })
}

function filterEpic(action$, store) {
  return action$.ofType(FILTER)
    .mergeMap(function({ meta, payload }) {
      return (// concat(
        of(
          setFilters(payload, meta),
          request(undefined, { ...meta, type: 'GET' }),
        )
      )
    })
}

function getNamespace({ list, item, namespace }) {
  if(!Array.isArray(namespace)) {
    namespace = [namespace, namespace]
  }

  return namespace[list && !item ? 0 : 1]
}

function makeRequestAction(type, meta) {
  return function(payload, options) {
    if(type === 'GET' && payload !== undefined) {
      // TODO assert here
      console.warn('GET action should not contain request body')
    }
    const passMeta = options === undefined
      ? meta
      : { ...meta, resource: { ...meta.resource, ...options }}
    return request(payload, { ...passMeta, type })
  }
}

function parseOptions(options) {
  return merge.apply(null, values(options.actions))
}

export const epic = combineEpics(
  requestEpic,
  filterEpic,
)
