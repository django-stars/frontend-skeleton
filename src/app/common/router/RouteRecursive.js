import { Route, Redirect, Switch } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { CheckAccess } from 'common/session'
import PropTypes from 'prop-types'

RouteRecursive.propTypes = {
  access: PropTypes.number,
  layout: PropTypes.elementType,
  component: PropTypes.elementType,
  routes: PropTypes.array,
  redirectTo: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string,
    state: PropTypes.object,
  }),
  match: PropTypes.object,
}

RouteRecursive.defaultProps = {
  access: undefined,
  layout: undefined,
  component: undefined,
  routes: undefined,
  redirectTo: undefined,
  match: undefined,
  location: undefined,
}

export default function RouteRecursive({ access, layout: Layout, component: Component, routes, redirectTo, ...route }) {
  let renderRoute = null
  if(Array.isArray(routes) && !isEmpty(routes)) {
    renderRoute = function(props) {
      return (
        <Switch>
          {routes.map((r, i) => (<RouteRecursive key={i} {...r} path={relativePath(route.path, r.path)} />))}
          {
            // fallback
            Component
              ? <Route><Component {...props} /></Route>
              : <Redirect to="/404" />
          }
        </Switch>
      )
    }
  }

  if(redirectTo) {
    renderRoute = function(props) {
      let newPath = props.location.pathname
      if(newPath.startsWith(props.match.path)) {
        newPath = redirectTo + newPath.substr(props.match.path.length)
      } else {
        newPath = redirectTo
      }
      return <Redirect to={newPath} />
    }
  }

  let rendered = (
    <Route {...route} component={renderRoute ? null : Component} render={renderRoute} />
  )

  if(Layout) {
    rendered = <Layout>{rendered}</Layout>
  }

  return (
    <CheckAccess
      access={access}
      fallback={
        <Redirect to={route.accessRedirectTo || '/auth/signin'} />
      }
    >{rendered}</CheckAccess>
  )
}

function relativePath(root = '', path = '') {
  return (root + path).split('//').join('/')
}
