import { Component } from 'react'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { startSubmit, stopSubmit, setSubmitSucceeded, setSubmitFailed } from 'redux-form'

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

import omit from 'lodash/omit'
import merge from 'lodash/merge'
import values from 'lodash/values'

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
// lazy load

const REQUEST = '@ds-resource/request'
const SET_DATA = '@ds-resource/set-data'
const SET_ERRORS = '@ds-resource/set-errors'
const SET_LOADING = '@ds-resource/set-loading'

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


export function selectResource(resource) {
  return function(state) {
    let resourceState = {
      // FIXME wrong place for default state
      data: null,
      options: null,
      isLoading: false,
      errors: null,
      loading: 0,
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

        setData: payload => setData(payload, meta),
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
          ...omit(dispatchProps, 'onSubmit'),
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

        if(!hasData || (resource.options && !hasOptions)) {
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

      return {
        ...state,
        [meta.resource.namespace]: {
          ...currentData,
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
  }

  return state
}

export function epic(action$, store, { API }) { // FIXME API
  return action$.ofType(REQUEST)
    // .debounce(() => interval(100)) // FIXME: FAIL on different requests types
    .mergeMap(function({ meta, payload }) {
      const { type, props, resource } = meta
      let endpoint = resource.endpoint
      if(!(new RegExp(`:(id|${resource.idKey})\\W`, 'g').test(endpoint))) {
        // automatically set '/:id?' to endpoint
        endpoint += '/:id?'
      }
      const toPath = pathToRegexp.compile(resource.endpoint)
      endpoint = toPath({ ...props, id: props[resource.idKey] })
      const submitting = resource.form && ['POST', 'PATCH', 'PUT', 'DELETE'].includes(type)

      return concat(
        of(
          setLoading(+1, meta),
          // TODO it seems we can move form-related actions to separate epic
          submitting && startSubmit(resource.form),
        ),
        fromPromise(API(endpoint).request(type, {}, payload))
          .switchMap(response => of(
            setData(response, meta),
            setLoading(-1, meta),
            submitting && stopSubmit(resource.form),
            submitting && setSubmitSucceeded(resource.form),
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

function getNamespace({ list, item, namespace }) {
  if(!Array.isArray(namespace)) {
    namespace = [namespace, namespace]
  }

  return namespace[list && !item ? 0 : 1]
}

function makeRequestAction(type, meta) {
  return function(payload) {
    if(type === 'GET' && payload !== undefined) {
      // TODO assert here
      console.warn('GET action should not contain request body')
    }
    return request(payload, { ...meta, type })
  }
}

function parseOptions(options) {
  return merge.apply(null, values(options.actions))
}
