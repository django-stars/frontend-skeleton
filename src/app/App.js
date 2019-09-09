import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { hot } from 'react-hot-loader/root'
import { createBrowserHistory } from 'history'
import routes from './routes'
import { RouteRecursive } from 'common/router'
import store from './init'

const history = createBrowserHistory()

function AppProvider() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <RouteRecursive routes={routes} />
      </Router>
    </Provider>
  )
}

export default hot(AppProvider)
