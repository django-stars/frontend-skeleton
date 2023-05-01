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
    // NOTE we can't use path.resolve for exclude
    // path.resolve doesn't resolve symlinks
    // in docker containers node_modules folder usually placed in separate symlinked directories
    // path.resolve will provide incorrect string, so we need to use RegExp here
    // more documentation here: https://webpack.js.org/configuration/module/#condition
    match(['*.css', '*.sass', '*.scss'], { exclude: /node_modules/ }, [
      process.env.SSR ? css() : css.modules({
        localsConvention: 'camelCase',
      }),
      sass({
        sassOptions: {
          includePaths: [
            path.resolve('./src/styles'),
            path.resolve('./node_modules/bootstrap/scss'),
            path.resolve('./node_modules'),
          ],
        },
      }),
      postcss(),
      env('production', [
        extractText('bundle.css'),
      ]),
    ]),
  ])
}
