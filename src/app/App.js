import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { hot } from 'react-hot-loader'

import routes from './routes'
import { RouteRecursive } from 'common/router'


function AppProvider({ store, history }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <RouteRecursive routes={routes} />
      </ConnectedRouter>
    </Provider>
  )
}

export default hot(module)(AppProvider)
