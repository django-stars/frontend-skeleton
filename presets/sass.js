import { css, env, extractText, group, match, sass } from 'webpack-blocks'
import path from 'path'

export default function(config) {
  return group([
    match(['*.css', '*.sass', '*.scss'], { exclude: path.resolve('node_modules') }, [
      css(),
      sass({
        includePaths: [
          path.resolve('./src/styles'),
          path.resolve('./node_modules/bootstrap/scss'),
          path.resolve('./node_modules'),
        ],
      }),
      env('production', [
        extractText('bundle.css'),
      ]),
    ]),
  ])
}
