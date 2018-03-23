import { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { fromPromise } from 'rxjs/observable/fromPromise'
import { concat } from 'rxjs/observable/concat'
// import { interval } from 'rxjs/observable/interval'
import { of } from 'rxjs/observable/of'

import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/switchMap'

// TODO
// OPTIONS request
// errors handling
// metadata handling
// global configuration
// submit only dirty
// isList
// use uuid
// endpoint generation (/name/:uuid, /name-:placeholder/)
// pagination, filters, withRouter
// debounce
// List and Item components
// HEAD request
// custom: actions, reducer, epics

const REQUEST = '@ds-resource/request'
const SET_DATA = '@ds-resource/set-data'

export function request(payload, meta, resource = meta.resource) {
  return {
    type: REQUEST,
    meta: { ...meta, resource },
    payload,
  }
}

export function setData(payload, meta, resource = meta.resource) {
  return {
    type: SET_DATA,
    meta: { ...meta, resource },
    payload,
  }
}

export function selectResource(resource, options) {
  return function(state) {
    return state.resource[resource.namespace] || { data: null }
  }
}

export function selectFormResource(resource, options) {
  return function(state) {
    const resourceState = selectResource(resource, options)(state)
    return {
      ...resourceState,
      initialValues: resourceState.data || {},
    }
  }
}

export function connectResource(resource, options = {}) {
  options = {
    // FIXME global configuration
    idKey: 'uuid',
    prefetch: true,
    form: false,
    ...options,
  }

  const { namespace } = resource

  const connectHOC = connect(
    // data
    options.form ? selectFormResource(resource) : selectResource(resource),
    // actions
    (dispatch) => ({
      fetch: () => dispatch(request(undefined, { type: 'GET' }, resource)),
      remove: () => dispatch(request(undefined, { type: 'DELETE' }, resource)),
      save: (payload) => dispatch(request(payload, { type: 'PATCH' }, resource)),
      update: (payload) => dispatch(request(payload, { type: 'PATCH' }, resource)),
      create: (payload) => dispatch(request(payload, { type: 'POST' }, resource)),
      replace: (payload) => dispatch(request(payload, { type: 'PUT' }, resource)),

      // FIXME for form remove all other actions
      // FIXME patch/post based on uuid
      onSubmit: (payload) => dispatch(request(payload, { type: 'PATCH' }, resource)),
    }),
    // merge
    (stateProps, dispatchProps, ownProps) => ({
      initialValues: stateProps.initialValues,
      onSubmit: dispatchProps.onSubmit,
      ...ownProps,
      [namespace]: {
        ...ownProps[namespace],
        ...stateProps,
        ...dispatchProps,
      },
    })
  )

  if(!options.prefetch) {
    return connectHOC
  }

  return compose(
    connectHOC,
    makePrefetchHOC(resource, options),
  )
}

export function connectFormResource(resource, options) {
  return connectResource(resource, { ...options, form: true })
}

function makePrefetchHOC(resource) {
  return function(ComposedComponent) {
    return class PrefetchResourceContainer extends Component {
      componentDidMount() {
        this.props[resource.namespace].fetch()
      }

      render() {
        if(this.props[resource.namespace].data === null) {
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
    case SET_DATA:
      return {
        ...state,
        [meta.resource.namespace]: {
          data: payload,
        },
      }
  }

  return state
}

export function epic(action$, store, { API }) { // FIXME API
  return action$.ofType(REQUEST)
    // .debounce(() => interval(100)) // FIXME: FAIL on different requests types
    .switchMap(function({ meta, payload }) {
      return concat(
        // of(actions.setLoading(true)),
        fromPromise(API(meta.resource.endpoint).request(meta.type, {}, payload))
          .switchMap(response => of(
            setData(response, meta),
            // actions.setLoading(false),
          ))
          // .catch(err => of(actions.setErrors(err)))
      )
    })
}
