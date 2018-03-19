import { addPlugins, devServer, env, group } from 'webpack-blocks'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import url from 'url'
import path from 'path'


export default function(config) {
  return group([
    addPlugins([
      // Injects bundles in your index file instead of wiring all manually.
      // you can use chunks option to exclude some bundles and add separate entry point
      new HtmlWebpackPlugin({
        template: path.resolve(`${process.env.SOURCES_PATH}/index.html`),
        inject: 'body',
        hash: true,
        showErrors: true, // TODO check this
        // index.html should not be inside assets folder
        filename: path.resolve(`${process.env.OUTPUT_PATH}/index.html`),
      }),
    ]),

    env('development', [
      devServer.proxy(configureProxy()),
    ]),
  ])
}

function configureProxy() {
  if(process.env.NODE_ENV !== 'development') {
    return []
  }
  // Proxy API requests to backend
  var urlData = url.parse(process.env.BACKEND_URL)
  var backendBaseURL = urlData.protocol + '//' + urlData.host

  var options = {
    changeOrigin: true,
    target: backendBaseURL,
    secure: false,
    // logLevel: 'debug',
  }

  if(urlData.auth) {
    options.auth = urlData.auth
  }

  var context = [process.env.API_URL].concat(JSON.parse(process.env.PROXY))

  var ret = [Object.assign({}, options, {
    context: context,
  })]

  return ret
}
