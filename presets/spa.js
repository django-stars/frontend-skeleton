import { addPlugins, group } from 'webpack-blocks'
import HtmlWebpackPlugin from 'html-webpack-plugin'
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
        showErrors: true,
        // index.html should be outside assets folder
        filename: path.resolve(`${process.env.OUTPUT_PATH}/index.html`),
        env: process.env,
      }),
    ]),
  ])
}
