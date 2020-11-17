import { group, match, devServer, env, addPlugins } from 'webpack-blocks'
import path from 'path'
import webpack from 'webpack'

export default function ssr(config) {

  return group([
    match(['*.css', '*.sass', '*.scss', '*polyfills.js'], [
      nothing(),
    ]),

    /*
    env('development', [
      devServer({
        inline: false,
        // FIXME hot updates still created
        hot: false,
      })
    ]),
    */
  ])
}

function nothing(options = {}) {
  return (context, util) =>
    util.addLoader(
      Object.assign(
        {
          use: 'null-loader',
        },
        context.match
      )
    )
}
