import { css, extractText, group, match, postcss } from 'webpack-blocks'
import path from 'path'


export default function spa(config) {
  return group([
    match('*.css', { exclude: path.resolve('node_modules') }, [
      css(),
      postcss(),
      extractText('bundle.css'),
    ]),
  ])
}
