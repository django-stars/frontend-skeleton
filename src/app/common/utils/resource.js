import isString from 'lodash/isString'
import { connect } from 'react-redux'

import { fromPromise } from 'rxjs/observable/fromPromise'
import { concat } from 'rxjs/observable/concat'
import { interval } from 'rxjs/observable/interval'
import { of } from 'rxjs/observable/of'

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

export function selectResource(resource) {
  return function(state) {
    return state.resource[resource.namespace] || {}
  }
}

export function connectResource(resource) {
  const { namespace } = resource
  return connect(
    // data
    selectResource(resource),
    // actions
    (dispatch) => ({
      fetch: () => dispatch(request(null, { type: 'GET' }, resource)),
      remove: () => dispatch(request(null, { type: 'DELETE' }, resource)),
      save: (payload) => dispatch(request(payload, { type: 'PATCH' }, resource)),
      update: (payload) => dispatch(request(payload, { type: 'PATCH' }, resource)),
      create: (payload) => dispatch(request(payload, { type: 'POST' }, resource)),
      replace: (payload) => dispatch(request(payload, { type: 'PUT' }, resource)),
    }),
    // merge
    (stateProps, dispatchProps, ownProps) => ({
      ...ownProps,
      [namespace]: {
        ...ownProps[namespace],
        ...stateProps,
        ...dispatchProps,
      },
    })
  )
}
/*  return function(ComposedComponent) {

    return class ResourceContainer extends Component {
      componentWillMount() {
        //this.props[resource.namespace].fetch()
        fetch(resource)
      }

      render() {
        console.log(resource)
        const props = {
          ...this.props,
        }
        return <ComposedComponent {...props} />
      }
    }

  }
} */

export function makeResource(config) {
  if(isString(config)) {
    // syntax sugar
    config = {
      namespace: config,
    }
  }

  if(config.endpoint === undefined) {
    config.endpoint = config.namespace
  }

  return config
}

const defaultState = {
}


export function reducer(state = defaultState, { type, payload = {}, meta = {}, error = false }) {
  switch (type) {
    case SET_DATA: return {
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
    .debounce(() => interval(100)) // FIXME: FAIL on different requests types
    .switchMap(function({ meta, payload }) {
      return concat(
        // of(actions.setLoading(true)),
        fromPromise(API(meta.resource.endpoint).request(meta.type, payload))
          .switchMap(response => of(
            setData(response, meta),
            // actions.setLoading(false),
          ))
          // .catch(err => of(actions.setErrors(err)))
      )
    })
}


/*

resource: {
  data: {1: {}, 2: {}, 3: {}}
  ids: [1,2,3]
  count: 200,
  query: {offset, limit},
}


connectResource(, {meta: ''})
funds)


*/


// filters -> epic
// requsts duplication -> debounce
// custom actions ?
//
