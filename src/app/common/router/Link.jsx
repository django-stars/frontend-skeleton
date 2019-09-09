import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import pathToRegexp from 'path-to-regexp'
import { getRoterConfigs } from './routerConfigs'


function NamedLink(LinkComponent) {
  return function({ to, state = {}, ...props }) {
    const namedRoutes = getRoterConfigs()
    let path = get(namedRoutes, to, '')
    if(!path && !isEmpty(namedRoutes)) {
      throw new Error('no route with name: ' + to)
    }
    if(path.search(/\/:/)) {
      path = pathToRegexp.compile(path)(props)
    }
    return <LinkComponent to={{ pathname: path, state }} {...props} />
  }
}

const Link = NamedLink(RouterLink)
const NavLink = NamedLink(RouterNavLink)

export { Link, NavLink }
