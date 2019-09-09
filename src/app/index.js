import { render } from 'react-dom'
import App from './App'
import { store, history } from './init'

render(
  <App />,
  document.getElementById('root'),
)
