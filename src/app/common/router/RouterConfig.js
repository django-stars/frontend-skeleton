import { createContext, Component } from 'react'
import PropTypes from 'prop-types'
const RouterConfigContext = createContext({})

const propTypes = {
  routes: PropTypes.array.isRequired,
  children: PropTypes.node,
}

const defaultProps = {
  children: undefined,
}

export default class RouterConfig extends Component {
  render() {
    return (
      <RouterConfigContext.Provider value={routesMap(this.props.routes)}>
        {this.props.children}
      </RouterConfigContext.Provider>
    )
  }
}

RouterConfig.propTypes = propTypes
RouterConfig.defaultProps = defaultProps

export { RouterConfigContext }


function routesMap(routes, basePath = '/') {
  return routes.reduce((acc, { name, path, routes }) => {
    if(!path) {
      return acc
    }

    path = makePath(path, basePath)

    if(name) {
      acc = {
        ...acc,
        [name]: path,
      }
    }

    if(routes) {
      acc = {
        ...acc,
        ...(routesMap(routes, path)),
      }
    }
    return acc
  }, {})
}


function makePath(path, basePath) {
  return (basePath + path).replace(/\/+/g, '/')
}
