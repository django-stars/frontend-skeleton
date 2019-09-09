import { useContext, useMemo } from 'react'
import { getRoterConfigs } from './routerConfigs'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import pathToRegexp from 'path-to-regexp'
import { __RouterContext as RouterContext } from 'react-router'
import { buildQueryParams } from 'common/utils/queryParams'


export default function withNamedRouter(ChildComponent) {
  return function NamedRouter(props) {
    const routerValue = useContext(RouterContext)
    const history = useMemo(() => namedHistory(routerValue.history), [routerValue])
    return (
      <ChildComponent
        history={history}
        location={routerValue.location}
        match={routerValue.location}
        {...props}
      />
    )
  }
}

function namedHistory(location) {
  return {
    ...location,
    push: (path, state) => location.push(namedNavigation(path, state), state),
    replace: (path, state) => location.replace(namedNavigation(path, state), state),
  }
}

function namedNavigation(to, state) {
  let path = makePath(to)
  if(path.pathname.search(/\/:/)) {
    path.pathname = pathToRegexp.compile(path.pathname)(state)
  }
  if(!!path.search && typeof path.search === 'object') {
    path.search = buildQueryParams(path.search)
  }
  return path
}

function makePath(to) {
  if(typeof to === 'string') {
    return { pathname: getNamedRouteName(to) }
  }
  return {
    ...to,
    pathname: getNamedRouteName(to.pathname),
  }
}

function getNamedRouteName(to) {
  const namedRoutes = getRoterConfigs()
  const pathname = get(namedRoutes, to, '')
  if(!pathname && !isEmpty(namedRoutes)) {
    throw new Error('no route with name: ' + to)
  }
  return pathname
}
