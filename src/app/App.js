import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'common/router'
import { CheckCache } from '@ds-frontend/cache'
import routes from './routes'
import PropTypes from 'prop-types'

App.propTypes = {
  store: PropTypes.object.isRequired,
  routerContext: PropTypes.object,
  origin: PropTypes.string,
  staticUrl: PropTypes.string,
}

App.defaultProps = {
  routerContext: {},
  origin: undefined,
  staticUrl: undefined,
}


function App({ store, staticUrl, origin, routerContext }) {
  try {
    const CheckCacheComponent = process.env.SSR ? Fragment : CheckCache
    return (
      <Provider store={store}>
        <CheckCacheComponent>
          <Router staticUrl={staticUrl} origin={origin} routerContext={routerContext} routes={routes}/>
        </CheckCacheComponent>
      </Provider>
    )
  } catch(error) {
    // TODO log to sentry
    console.error('[e][%s] render', process.env.SSR ? 'SSR' : 'SPA ⬇️')
    console.error(error)
    return (
      <Fragment>
        {process.env.SSR && (
          <h2>500</h2>
        )}
        <p>Something went wrong.</p>
        <p>Please try to reload the page or go to <a href="/">home</a></p>
      </Fragment>
    )
  }
}

export default process.env.SSR ? App : require('react-hot-loader/root').hot(App)
