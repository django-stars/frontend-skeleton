import { css, env, extractText, group, match, postcss } from 'webpack-blocks'
import path from 'path'


export default function(config) {
  return group([
    match('*.css', { exclude: path.resolve('node_modules') }, [
      css(),
      postcss(),
      env('production', [
        extractText('bundle.css'),
      ]),
    ]),
  ])
}
