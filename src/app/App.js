import { Provider } from 'react-redux'
import { Router } from 'common/router'
import { CheckCache } from '@ds-frontend/cache'
import { hot } from 'react-hot-loader/root'
import routes from './routes'
import PropTypes from 'prop-types'

AppProvider.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}


function AppProvider({ store, history }) {
  return (
    <Provider store={store}>
      <CheckCache>
        <Router history={history} routes={routes}/>
      </CheckCache>
    </Provider>
  )
}

export default hot(AppProvider)
