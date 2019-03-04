import { css, env, extractText, group, match, sass, postcss } from 'webpack-blocks'
import path from 'path'

export default function(config) {
  return group([
    match(['*node_modules*.css'], [
      css({
        styleLoader: {
          insertAt: 'top',
        },
      }),
    ]),
    match(['*.css', '*.sass', '*.scss'], { exclude: path.resolve('node_modules') }, [
      css.modules({ camelCase: true }),
      sass({
        includePaths: [
          path.resolve('./src/styles'),
          path.resolve('./node_modules/bootstrap/scss'),
          path.resolve('./node_modules'),
        ],
      }),
      postcss(),
      env('production', [
        extractText('bundle.css'),
      ]),
    ]),
  ])
}
