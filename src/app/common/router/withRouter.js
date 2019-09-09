import { useContext, useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import pathToRegexp from 'path-to-regexp'
import { __RouterContext as RouterContext } from 'react-router'
import { RouterConfigContext } from './RouterConfig'
import { buildQueryParams } from 'common/utils/queryParams'


export default function withNamedRouter(ChildComponent) {
  return function NamedRouter(props) {
    const routerValue = useContext(RouterContext)
    const namedRoutes = useContext(RouterConfigContext)
    const history = useMemo(() => namedHistory(routerValue.history, namedRoutes), [routerValue])
    return (
      <ChildComponent
        {...props}
        history={history}
        location={routerValue.location}
        match={routerValue.match}
      />
    )
  }
}

function namedHistory(location, namedRoutes) {
  return {
    ...location,
    push: (path, state) => location.push(custonNavigation(makePath(path, namedRoutes), state), state),
    replace: (path, state) => location.replace(custonNavigation(makePath(path, namedRoutes), state), state),
  }
}

function custonNavigation(path, state) {
  if(path.pathname.search(/\/:/) > -1) {
    path.pathname = pathToRegexp.compile(path.pathname)(state)
  }
  if(!!path.search && typeof path.search === 'object') {
    path.search = buildQueryParams(path.search)
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
