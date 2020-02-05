import 'react-hot-loader'
import { render } from 'react-dom'
import App from './App'
import { store, history } from './init'

render(
  <App store={store} history={history} />,
  document.getElementById('root'),
)
