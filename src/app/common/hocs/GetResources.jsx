import { Component } from 'react'
import get from 'lodash/get'

export default function withResources(resourceKey) {
  return function resourcesHOC(ChildComponent) {
    return class Prefetch extends Component {
      componentDidMount() {
        get(this.props, `[${resourceKey}].fetch`, () => {})()
      }

      render() {
        return (
          <ChildComponent {...this.props} />
        )
      }
    }
  }
}
