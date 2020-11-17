import { group, devServer as devServerBlock } from 'webpack-blocks'
import path from 'path'
import get from 'lodash/get'
import { getFilenameFromUrl } from 'webpack-dev-middleware/lib/util'
import { match as proxyMatch } from 'http-proxy-middleware/lib/context-matcher'
import getContent from '../src/ssr/get-content'
import decache from 'decache'


const publicPath = path.resolve(`${process.env.OUTPUT_PATH}`)

export default function devServer() {
  return devServerBlock({
    contentBase: path.resolve(`${process.env.OUTPUT_PATH}`),
    port: process.env.DEV_SERVER_PORT || 3000,
    overlay: true,
    clientLogLevel: 'info', // FIXME move to VERBOSE mode (add loglevel/verbose option)
    stats: 'minimal',
    host: process.env.DEV_SERVER_HOST,

    // FIXME
    filename: 'bundle.js',

    allowedHosts: [
      '.localhost',
      `.${process.env.MAIN_HOST}`,
    ],

    writeToDisk: true,

    before: middleware,
  })
}

function middleware(app, server, compiler) {
  app.get('*', function(req, res, next) {
    if(!process.env.SSR) {
      return next()
    }

    let accept = String(get(req, 'headers.accept', ''))

    let isWebpackAsset = getFilenameFromUrl(
      process.env.PUBLIC_PATH,
      compiler,
      req.url
    )

    let isProxyMatched = proxyMatch(
      JSON.parse(process.env.PROXY),
      req.originalUrl || req.url,
      req
    )

    // skip
    if(isWebpackAsset || isProxyMatched) {
      return next()
    }

    // run SSR
    // TODO ensure that compilation is completed
    decache('../dist/ssr/ssr')
    return getContent(req.url)
      .then(c => res.send(c.content))
      .catch(e => {
        res.status(500).send('Internal server error.')
        console.error(e)
      })
  })
}
