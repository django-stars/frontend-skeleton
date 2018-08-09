import { devServer, env, group } from 'webpack-blocks'
import url from 'url'


export default function(config) {
  return group([
    env('development', [
      devServer({
        proxy: configureProxy(),
      }),
    ]),
  ])
}

function configureProxy() {
  let ret = [
    // proxy API and other paths from env.PROXY
    makeProxyContext(JSON.parse(process.env.PROXY), process.env.PROXY_URL),
  ]

  if(process.env.SSR) {
    // proxy templates
    ret.push(
      makeProxyContext([
        '/**',
        `!${process.env.PUBLIC_PATH}`,
      ], process.env.BACKEND_URL)
    )
  }

  return ret
}

function makeProxyContext(paths, targetUrl) {
  const urlData = url.parse(targetUrl)

  return {
    secure: false,
    // TODO we need verbose logs for proxy (full request/response data)
    // we can make it manually via `logProvider` option
    logLevel: 'debug',

    // http -> httpS proxy settings
    changeOrigin: true,
    // headers: { host: urlData.host },

    auth: urlData.auth,
    target: urlData.protocol + '//' + urlData.host,
    router: makeRouter(urlData),
    context: paths,
  }
}

function makeRouter(urlData) {
  return function router(req) {
    const MAIN_HOST = process.env.MAIN_HOST
    const subdomain = MAIN_HOST && req.headers.host.includes(MAIN_HOST)
      ? req.headers.host.split(MAIN_HOST)[0]
      : ''

    const proxyUrl = urlData.protocol + '//' + subdomain + urlData.host

    return proxyUrl
  }
}
