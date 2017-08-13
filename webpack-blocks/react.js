module.exports = react

const babel = require('@webpack-blocks/babel6')

function react(options) {
  options = options || {}

  return babel({
    // FIXME all this already sets in babelrc (for jest)
    // FIXME why we use modules:false ? (maybe for NG??)
    presets: [['es2015', { 'modules': false }], 'stage-0', 'react'],
    plugins: ['react-require'],
  })
}
