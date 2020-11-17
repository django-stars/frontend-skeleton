import 'react-hot-loader'
import { render, hydrate } from 'react-dom'
import { store } from './init'
import App from './App'


let needHydrate = Boolean(document.getElementById('root').dataset.initialState)
let renderDOM = needHydrate ? hydrate : render

renderDOM(
  <App store={store} />,
  document.getElementById('root'),
)
