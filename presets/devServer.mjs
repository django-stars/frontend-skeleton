/**
 * Webpack dev-server block.
 *
 * @see https://github.com/andywer/webpack-blocks/blob/master/packages/dev-server/index.js
 */

/**
 * @param {object} [options]    See https://webpack.js.org/configuration/dev-server/
 * @param {string|string[]} [entry]
 * @return {Function}
 */
export default function devServer(options = {}, entry = []) {
  if(options && (typeof options === 'string' || Array.isArray(options))) {
    entry = options
    options = {}
  }

  if(!Array.isArray(entry)) {
    entry = entry ? [entry] : []
  }

  const setter = context => prevConfig => {
    context.devServer = context.devServer || { entry: [], options: {} }
    context.devServer.entry = context.devServer.entry.concat(entry)
    context.devServer.options = Object.assign({}, context.devServer.options, options)

    return prevConfig
  }

  return Object.assign(setter, { post: postConfig })
}

function postConfig(context, util) {
  const entryPointsToAdd = context.devServer.entry

  return prevConfig => {
    return util.merge({
      devServer: Object.assign(
        {
          hot: true,
          historyApiFallback: true,
        },
        context.devServer.options,
      ),
      entry: addDevEntryToAll(prevConfig.entry || {}, entryPointsToAdd),
    })(prevConfig)
  }
}

function addDevEntryToAll(presentEntryPoints, devServerEntry) {
  const newEntryPoints = {}

  Object.keys(presentEntryPoints).forEach(chunkName => {
    // It's fine to just set the `devServerEntry`, instead of concat()-ing the present ones.
    // Will be concat()-ed by webpack-merge (see `createConfig()`)
    newEntryPoints[chunkName] = devServerEntry
  })

  return newEntryPoints
}
