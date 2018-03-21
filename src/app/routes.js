import NotFound from 'pages/fallbacks/NotFound'

import { routes as test } from 'pages/test'

// import { access } from 'common/session'

const appRoutes = [
  {
    path: '/',
    exact: true,
    name: 'root',
    redirectTo: '/test',
  },
  {
    path: '/',
    routes: [
      {
        path: '/test',
        routes: test,
      },
      {
        component: NotFound,
      },
    ],
  },
]

export default appRoutes
export const namedRoutes = routesMap(appRoutes)

function routesMap(routes, basePath = '/') {
  return routes.reduce(function(acc, { name, path, routes }) {
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
