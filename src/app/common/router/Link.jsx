import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'

import { namedRoutes } from 'routes'

function NamedLink(LinkComponent) {
  return function({to, state = {}, ...props}) {
    let path = namedRoutes[to]
    if(!path) {
      throw 'no route with name: ' + to
    }

    return <LinkComponent to={{pathname: path, state}} {...props} />
  }
}

const Link = NamedLink(RouterLink)
const NavLink = NamedLink(RouterNavLink)

export { Link, NavLink }
