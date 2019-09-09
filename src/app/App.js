import { Provider } from 'react-redux'
import { Router } from 'common/router'
import { hot } from 'react-hot-loader'
import routes from './routes'

const history = createBrowserHistory()

function AppProvider() {
  return (
    <Provider store={store}>
      <Router history={history} routes={routes}/>
    </Provider>
  )
}

export default hot(module)(AppProvider)
