import { StaticRouter, BrowserRouter } from 'react-router-dom'
import { createLocation } from 'history'
import PropTypes from 'prop-types'
import RouteRecursive from './RouteRecursive'
import RouterConfig from './RouterConfig'


AppRouter.propTypes = {
  routes: PropTypes.array.isRequired,
  routerContext: PropTypes.object,
  origin: PropTypes.string,
  staticUrl: PropTypes.string,
}

AppRouter.defaultProps = {
  routerContext: {},
  origin: undefined,
  staticUrl: undefined,
}

export default function AppRouter({ routes, routerContext, origin, staticUrl }) {
  const Router = process.env.SSR ? StaticRouter : BrowserRouter
  const location = createLocation(staticUrl)
  location.origin = origin

  return (
    <Router location={location} context={routerContext}>
      <RouterConfig routes={routes}>
        <RouteRecursive routes={routes} />
      </RouterConfig>
    </Router>
  )
}
