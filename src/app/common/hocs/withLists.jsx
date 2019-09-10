import { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import memizedOne from 'memoize-one'
import Loading from '../widgets/Loading'

function filterData(data = [], filter = '') {
  if(isEmpty(data)) { return [] }
  if(!filter) { return data }
  return data.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
}

const cachedFiler = memizedOne(filterData)

export default function ListsHOC(WrappedComponent) {
  return class withListData extends Component {
    componentDidMount() {
      this.getInitialData()
    }

    static defaulProps = {
      apiParams: {},
      filters: {},
      showLoading: true,
    }

    loadNext = () => {
      if(isEmpty(this.props.data) || this.props.isLoading) { return }
      const { count, results } = this.props.data || {}
      if(this.props.usePages || this.props.useLimit) {
        if(results.length >= count || this.props.isLoading) {
          return
        }
        const { page, offset, limit } = this.props.filters || {}
        if(this.props.usePages) {
          return this.props.fetch({ ...this.props.filters, page: page + 1, ...this.props.apiParams })
        }
        if(this.props.useLimit) {
          return this.props.fetch({
            ...this.props.filters, offset: offset + limit, limit: process.env.LIMIT, ...this.props.apiParams,
          })
        }
      }
    }


    getInitialData = () => {
      if(this.props.usePages) {
        return this.props.fetch({ ...this.props.filters, page: 0, ...this.props.apiParams }, { reducer: 'replace' })
      }
      if(this.props.useLimit) {
        return this.props.fetch({
          ...this.props.filters, offset: 0, limit: process.env.LIMIT, ...this.props.apiParams,
        }, { reducer: 'replace' })
      }
      return this.props.fetch({ ...this.props.filters, ...this.props.apiParams }, { reducer: 'replace' })
    }


    addFilter = (filter) => {
      if(this.props.usePages) {
        return this.props.fetch({
          ...this.props.filters, page: 0, ...this.props.apiParams, ...filter,
        }, { reducer: 'replace' })
      }
      if(this.props.useLimit) {
        return this.props.fetch({
          ...this.props.filters, offset: 0, limit: process.env.LIMIT, ...this.props.apiParams, ...filter,
        }, { reducer: 'replace' })
      }
      return this.props.fetch({ ...this.props.filters, ...this.props.apiParams, ...filter }, { reducer: 'replace' })
    }


    render() {
      const isLoading = isEmpty(get(this.props, 'data.results')) && this.props.isLoading
      const footerExtraClass = !isEmpty(get(this.props, 'data.results')) && this.props.isLoading
      return (
        <Loading isLoading={isLoading}>
          <WrappedComponent
            {...this.props}
            loadNext={this.loadNext}
            initialLoading={this.props.isLoading && isEmpty(get(this.props.data, 'results', []))}
            addFilter={this.addFilter}
            cachedFiler={cachedFiler}
            showLoadMore={footerExtraClass}
          />
        </Loading>
      )
    }
  }
}
