import { devServer, env, group } from 'webpack-blocks'
import url from 'url'


export default function(config) {
  return group([
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
    // changeOrigin: true,
    target: backendBaseURL,
    secure: false,
    // changeOrigin, hostRewrite and protocolRewrite used here for httpS proxy
    changeOrigin: true,
    hostRewrite: true,
    protocolRewrite: true,
    headers: { host: urlData.host },
    logLevel: 'debug', // TODO verbose
  }

  if(urlData.auth) {
    options.auth = urlData.auth
  }

  options.context = [
    '/**',
    `!/${process.env.PUBLIC_PATH}/`,
  ]

  return [options]
}
