import { Provider } from 'react-redux'
import { Router } from 'common/router'
import { CheckCache } from 'ds-cache'
import { hot } from 'react-hot-loader'
import routes from './routes'


function AppProvider({ store, history }) {
  return (
    <Provider store={store}>
      <CheckCache>
        <Router history={history} routes={routes}/>
      </CheckCache>
    </Provider>
  )
}

export default hot(module)(AppProvider)
