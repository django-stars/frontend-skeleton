var autoprefixer = require('autoprefixer')
var inlineSVG = require('postcss-inline-svg')

module.exports = {
  sourceMap: true,
  plugins: [
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
    // TODO svg optimizations https://github.com/TrySound/postcss-inline-svg#how-to-optimize-svg-on-build-step
    inlineSVG({
      removeFill: false,
    }),
  ],
}
