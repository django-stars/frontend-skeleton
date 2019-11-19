import { Provider } from 'react-redux'
import { Router } from 'common/router'
import { hot } from 'react-hot-loader'
import routes from './routes'
import PropTypes from 'prop-types'

AppProvider.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}


function AppProvider({ store, history }) {
  return (
    <Provider store={store}>
      <Router history={history} routes={routes}/>
    </Provider>
  )
}

export default hot(module)(AppProvider)
