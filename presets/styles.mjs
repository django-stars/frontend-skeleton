import webpackBlocks from 'webpack-blocks'
import path from 'path'
import extractCss from './extract-css.mjs'

const { css, env, group, match, sass, postcss } = webpackBlocks

export default function(config) {
  return group([
    match(['*node_modules*.css'], [
      css({
        styleLoader: {
          insert: insertAtTop,
        },
      }),
    ]),
    // NOTE we can't use path.resolve for exclude
    // path.resolve doesn't resolve symlinks
    // in docker containers node_modules folder usually placed in separate symlinked directories
    // path.resolve will provide incorrect string, so we need to use RegExp here
    // more documentation here: https://webpack.js.org/configuration/module/#condition
    match(['*.css', '*.sass', '*.scss'], { exclude: /node_modules/ }, [
      process.env.SSR
        ? css()
        : css.modules({
          localsConvention: 'camelCase',
        }),
      sass({
        sassOptions: {
          loadPaths: [
            path.resolve('./src/styles'),
            path.resolve('./node_modules/bootstrap/scss'),
            path.resolve('./node_modules'),
          ],
        },
      }),
      postcss(),
      env('production', [
        extractCss('bundle.css'),
      ]),
    ]),
  ])
}

function insertAtTop(element) {
  const parent = document.querySelector('head')
  const lastInsertedElement = window._lastElementInsertedByStyleLoader

  if(!lastInsertedElement) {
    parent.insertBefore(element, parent.firstChild)
  } else if(lastInsertedElement.nextSibling) {
    parent.insertBefore(element, lastInsertedElement.nextSibling)
  } else {
    parent.appendChild(element)
  }

  window._lastElementInsertedByStyleLoader = element
}
