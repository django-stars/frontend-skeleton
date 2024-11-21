import webpackBlocks from 'webpack-blocks'
import path from 'path'
import extractCss from './extract-css.mjs'

const { css, env, group, match, sass } = webpackBlocks

export default function(config) {
  return group([
    match(['*.css', '*.sass', '*.scss'], { exclude: path.resolve('node_modules') }, [
      css(),
      sass({
        loadPaths: [
          path.resolve('./src/styles'),
          path.resolve('./node_modules/bootstrap/scss'),
          path.resolve('./node_modules'),
        ],
      }),
      env('production', [
        extractCss('bundle.css'),
      ]),
    ]),
  ])
}
