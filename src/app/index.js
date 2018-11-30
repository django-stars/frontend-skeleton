import { render } from 'react-dom'

import { store, history } from './init'
import App from './App'

render(
  <App store={store} history={history} />,
  document.getElementById('root'),
)
