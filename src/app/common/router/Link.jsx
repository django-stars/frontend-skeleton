import PropTypes from 'prop-types'
import { useContext, useMemo } from 'react'
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { RouterConfigContext } from './RouterConfig'
import { compile, parse } from 'path-to-regexp'


function NamedLink(LinkComponent) {
  LinkWrapped.propTypes = {
    to: PropTypes.string.isRequired,
    state: PropTypes.object,
  }

  LinkWrapped.defaultProps = {
    state: {},
  }
  function LinkWrapped({ to, state = {}, ...props }) {
    const namedRoutes = useContext(RouterConfigContext)
    let path = get(namedRoutes, to, '')
    if(!path && !isEmpty(namedRoutes)) {
      throw new Error('no route with name: ' + to)
    }
    if(path.includes(':')) {
      path = compile(path)(props)
    }
    const omitProps = useMemo(() => parse(get(namedRoutes, to, '')).filter(item => item.name).map(({ name }) => name), [path])
    return <LinkComponent to={{ pathname: path, state }} {...omit(props, omitProps)} />
  }
  return LinkWrapped
}

const Link = NamedLink(RouterLink)
const NavLink = NamedLink(RouterNavLink)

export { Link, NavLink }
