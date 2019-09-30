import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import connectResouces from 'ds-resource'
import prefetchResource from './prefetchResources'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'


export default function({ form, resource, prefetch = false, onSubmit = handleSubmit, LoadingWrapper }) {
  if(isEmpty(form)) {
    throw new Error(`form configs are required`)
  }
  if(Array.isArray(resource)) {
    throw new Error(`withFormResource HOC could acceps only 1 resource`)
  }
  if(typeof resource === 'function' && !resource.namespace) {
    throw new Error(`resource should be a HOC that returns from customResource function`)
  }
  const key = get(resource, 'namespace', resource)
  return compose(
    prefetch ? prefetchResource(resource, LoadingWrapper) : connectResouces(resource),
    connect(state => ({
      initialValues: get(state, `${key}.data`, {}),
    }), (dispatch, props) => {
      if(typeof resource === 'function') {
        return { onSubmit: get(props, `${key}.customRequest`) }
      }
      return {
        onSubmit: (data) => handleSubmit(data, get(props, key), { forceUpdates: true }),
      }
    }),
    reduxForm({ ...form }),
  )
}

function handleSubmit(data, resource, meta) {
  return get(data, 'uuid') ? resource.update(data, meta) : resource.create(data, meta)
}
