import { Route, Redirect, Switch } from 'react-router-dom'
import set from 'lodash/set'
import { CheckAccess } from 'common/session'


export default function RouteRecursive({ access, layout: Layout, component: Component, routes, redirectTo, ...route }) {
  let renderRoute = null
  if(routes && routes.length > 0) {
    renderRoute = function(props) {
      return (
        <Switch>
          {routes.map((r, i) => (
            <RouteRecursive key={i} {...r} path={relativePath(route.path, r.path)} />
          ))}
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

  if(route.name) {
    set(route, 'location.state.name', route.name)
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
