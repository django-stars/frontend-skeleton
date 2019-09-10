import { Component } from 'react'
import { parseQueryParams } from '../utils/queryParams'
import get from 'lodash/get'

export default function PrefetchLists(resourceKey) {
  return function resourcesHOC(ChildComponent) {
    return class PrefetchListsHOC extends Component {
      componentDidMount() {
        this.props[resourceKey].fetch({ offset: 0, limit: process.env.LIMIT, ...parseQueryParams(get(this.props, 'location.search', '')) })
      }

      render() {
        return (
          <ChildComponent {...this.props}/>
        )
      }
    }
  }
}
