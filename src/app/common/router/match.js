import { getRoterConfigs } from './routerConfigs'


function match(to) {
  const namedRoutes = getRoterConfigs()
  return window.location.pathname === namedRoutes[to]
}

export default match
