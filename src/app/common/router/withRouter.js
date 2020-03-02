import { useContext, useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import findKey from 'lodash/findKey'
import { compile, match } from 'path-to-regexp'
import { __RouterContext as RouterContext } from 'react-router'
import { RouterConfigContext } from './RouterConfig'
import { QS } from 'api'


export default function withNamedRouter(ChildComponent) {
  return function NamedRouter(props) {
    const routerValue = useContext(RouterContext)
    const namedRoutes = useContext(RouterConfigContext)
    const location = {
      ...routerValue.location,
      state: {
        ...(get(routerValue.location, 'state', {})),
        name: findKey(namedRoutes, key => match(key)(routerValue.location.pathname)),
      },
    }
    const history = useMemo(() => namedHistory(routerValue.history, namedRoutes), [routerValue])
    return (
      <ChildComponent
        {...props}
        history={history}
        location={location}
        match={routerValue.match}
      />
    )
  }
}

function namedHistory(location = {}, namedRoutes) {
  return {
    ...location,
    push: (path, state) => location.push(custonNavigation(makePath(path, namedRoutes), state), state),
    replace: (path, state) => location.replace(custonNavigation(makePath(path, namedRoutes), state), state),
  }
}

function custonNavigation(path, state) {
  if(path.pathname.search(/\/:/) > -1) {
    path.pathname = compile(path.pathname)(state)
  }
  if(!!path.search && typeof path.search === 'object') {
    path.search = QS.buildQueryParams(path.search)
  }
  return path
}

function makePath(to, namedRoutes) {
  if(typeof to === 'string') {
    return { pathname: getNamedRouteName(to, namedRoutes) }
  }
  return {
    ...to,
    pathname: getNamedRouteName(to.pathname, namedRoutes),
  }
}

function getNamedRouteName(to, namedRoutes) {
  if(to.startsWith('/')) {
    return to
  }
  const pathname = get(namedRoutes, to, '')
  if(!pathname && !isEmpty(namedRoutes)) {
    throw new Error('no route with name: ' + to)
  }
  return pathname
}
