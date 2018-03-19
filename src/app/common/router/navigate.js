import { push } from 'react-router-redux'

import { namedRoutes } from 'routes'


export default function navigate(name, state) {
  let path = namedRoutes[name]
  if(!path) {
    throw 'no route with name: ' + name
  }

  return push({pathname: path, state})
}
