import { namedRoutes } from 'routes'

function match(to) {
  return window.location.pathname === namedRoutes[to]
}

export default match
