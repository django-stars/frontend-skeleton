import { Router } from 'react-router'
import PropTypes from 'prop-types'
import RouteRecursive from './RouteRecursive'
import RouterConfig from './RouterConfig'

AppRouter.propTypes = {
  routes: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
}

export default function AppRouter({ routes, history }) {
  return (
    <Router history={history}>
      <RouterConfig routes={routes}>
        <RouteRecursive routes={routes} />
      </RouterConfig>
    </Router>
  )
}
