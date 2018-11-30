import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'

import pathToRegexp from 'path-to-regexp'

import { namedRoutes } from 'routes'

function NamedLink(LinkComponent) {
  return function({ to, state = {}, ...props }) {
    let path = namedRoutes[to]
    if(!path) {
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
