import { push } from 'react-router-redux'
import isEmpty from 'lodash/isEmpty'
import { getRoterConfigs } from './routerConfigs'


export default function navigate(name, state) {
  const namedRoutes = getRoterConfigs()
  let path = namedRoutes[name]
  if(!path && !isEmpty(namedRoutes)) {
    throw new Error('no route with name: ' + name)
  }
  return push({ pathname: path, state })
}
