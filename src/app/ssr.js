import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { store } from './init'
import App from './App'
// import getLanguageCode from 'common/getLanguageCode'
import {
  queue,
  // setLanguageCode,
} from '@ds-frontend/api'
// import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

const MAX_RENDER_ATTEMPTS = 100

export function render(url, { acceptLanguage, origin }) {
  let RUN_COUNT = 0

  store.dispatch({ type: 'SSR_CLEAN_STORE' })

  /*
  setLanguageCode(
    getLanguageCode(url, acceptLanguage)
  )
  */


  function process() {
    if(RUN_COUNT++ > MAX_RENDER_ATTEMPTS) {
      // because of we are on server-side
      // and we try to re-render applciation while data is loading
      // we need this check to prevent stuck server
      // NOTE this can be a problem on very BIG apps (but not in real world)
      // TODO 500 error here
      throw new Error('recursion detected. to much render attempts for one request')
    }

    // const sheet = new ServerStyleSheet()
    const routerContext = {}

    let html = renderToString(
      // <StyleSheetManager sheet={sheet.instance}>
      <App store={store} staticUrl={url} origin={origin} routerContext={routerContext} acceptLanguage={acceptLanguage} />
      // </StyleSheetManager>
    )
    const helmet = Helmet.renderStatic()

    return queue.size > 0
      ? Promise.all(queue.values()).then(timeout).then(process)
      : timeout().then(function() {
        return {
          html,
          css: '', // sheet.getStyleTags(),
          state: store.getState(),
          helmet,
          routerContext,
        }
      })
  }

  return Promise.resolve(process())
}

function timeout() {
  return new Promise(function(resolve) {
    // wait for redux actions complete
    setTimeout(resolve)
  })
}
