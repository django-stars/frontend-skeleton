import webpackBlocks from 'webpack-blocks'
import path from 'path'
import extractCss from './extract-css.mjs'

const { css, env, group, match, postcss } = webpackBlocks;

export default function(config) {
  return group([
    match('*.css', { exclude: path.resolve('node_modules') }, [
      css(),
      postcss(),
      env('production', [
        extractCss('bundle.css'),
      ]),
    ]),
  ])
}
