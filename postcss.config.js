const autoprefixer = require('autoprefixer')
const inlineSVG = require('postcss-inline-svg')

module.exports = {
  sourceMap: true,
  plugins: [
    autoprefixer,
    // TODO svg optimizations https://github.com/TrySound/postcss-inline-svg#how-to-optimize-svg-on-build-step
    inlineSVG({
      removeFill: false,
    }),
  ],
}
