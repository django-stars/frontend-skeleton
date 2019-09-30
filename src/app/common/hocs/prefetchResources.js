import { autobind } from 'core-decorators'
import { compose } from 'redux'
import { Component } from 'react'
import connectResouces from 'ds-resource'
import Loading from 'common/widgets/Loading'
import get from 'lodash/get'
import { QS } from 'api'

export default function prefetchResources(resources, LoadingWrapper = Loading) {
  if(typeof resources === 'function') {
    if(!resources.namespace) {
      throw new Error(`resource should be a HOC that returns from customResource function`)
    }
    return compose(
      resources,
      prefetch(resources, LoadingWrapper)
    )
  }
  const _resources = Array.isArray(resources) ? resources : [resources]
  const resourcesList = _resources.filter(item => typeof item !== 'function')
  const customResources = _resources.filter(item => typeof item === 'function')
  return compose(
    ...customResources,
    connectResouces(resourcesList),
    prefetch(_resources, LoadingWrapper)
  )
}


export function prefetch(resources, LoadingWrapper) {
  return function(ChildComponent) {
    return class Prefetch extends Component {
      @autobind
      getResources() {
        return resources.map(resource => {
          if(typeof resource === 'string') {
            return this.props[resource]
          }
          if(typeof resource === 'function') {
            if(typeof get(this.props, `[${resource.namespace}].customRequest`) !== 'function') { return }
            return this.props[resource.namespace]
          }
          return this.props[resource.namespace]
        }).filter(Boolean)
      }

      componentDidMount() {
        const queryData = get(this.props, 'location.search') ? QS.parseQueryParams(get(this.props, 'location.search')) : {}
        const navigationParams = get(this.props, 'match.params', {})
        this.fetchList = this.getResources().map(resource => {
          return resource.customRequest ? resource.customRequest({ ...queryData, ...navigationParams }) : resource.fetch({ ...queryData, ...navigationParams })
        })
      }

      componentWillUnmount() {
        if(Array.isArray(this.fetchList)) {
          this.fetchList.forEach(item => {
            if(item && item.cancel && typeof item.cancel === 'function') {
              item.cancel()
            }
          })
        }
      }

      isLoading() {
        return this.getResources().findIndex(({ isLoading }) => isLoading) > -1
      }

      render() {
        if(!LoadingWrapper) {
          return (
            <ChildComponent
              {...this.props}
              {...this.state}
            />
          )
        }

        return (
          <LoadingWrapper isLoading={this.isLoading()}>
            <ChildComponent
              {...this.props}
            />
          </LoadingWrapper>
        )
      }
    }
  }
}
