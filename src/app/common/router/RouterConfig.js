import { createContext, Component } from 'react'

const RouterConfigContext = React.createContext({})

export default class RouterConfig extends Component {
  render() {
    return (
      <RouterConfigContext.Provider value={routesMap(this.props.routes)}>
        {this.props.children}
      </RouterConfigContext.Provider>
    )
  }
}

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
