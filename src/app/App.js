import { Provider } from 'react-redux'
import { Router } from 'common/router'
import { CheckCache } from '@ds-frontend/cache'
import { hot } from 'react-hot-loader/root'
import routes from './routes'
import PropTypes from 'prop-types'
import { TranslateProvider } from '@ds-frontend/i18n'
import api from 'api'

AppProvider.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}


function AppProvider({ store, history }) {
  return (
    <TranslateProvider
      defaultLanguage="en"
      storage={localStorage}
      url="jsi18n"
      api={api}
    >
      <Provider store={store}>
        <CheckCache>
          <Router history={history} routes={routes}/>
        </CheckCache>
      </Provider>
    </TranslateProvider>
  )
}

export default hot(AppProvider)
