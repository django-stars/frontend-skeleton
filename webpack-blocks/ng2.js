module.exports = ng2

const babel = require('@webpack-blocks/babel6')
const webpack = require("webpack");
var path = require('path');

function ng2(options) {
  options = options || {}

  const bb = babel({
    presets: [['es2015', { 'modules': false }], 'angular2'],
    plugins: [
      'syntax-decorators',
      ['ng-annotate-2', {keepClass: true}],
      ['angularjs-annotate', { 'explicitOnly': true }]
    ]
  })

  return Object.assign((context) => {
    bb(context)
    return {
      plugins: [
        // SHIMS
        new webpack.ProvidePlugin({
          'window.jQuery': 'jquery', // need for the angular
          'jQuery': 'jquery'
        }),

        new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
          path.resolve('./src/app')
        )
      ]
    }
  }, { post: bb.postConfig })
}
