class RouterConfigurations {
  constructor() {
    this.routes = {}
  }

  buildRoutes(routes, basePath = '/') {
    this.routes = this.routesMap(...arguments)
    return this.routes
  }

  getRoutes() {
    return this.routes
  }

  routesMap(routes, basePath = '/') {
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
          ...(this.routesMap(routes, path)),
        }
      }
      return acc
    }, {})
  }
}

const Router = new RouterConfigurations()

function makePath(path, basePath) {
  return (basePath + path).replace(/\/+/g, '/')
}

export function routesMap() {
  return Router.buildRoutes(...arguments)
}

export function getRoterConfigs() {
  return Router.getRoutes()
}
