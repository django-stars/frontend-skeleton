module.exports = sass

var path = require('path')
var compassImporter = require('compass-importer')

function sass(options) {
  options = options || {} // TODO

  return (context) => ({
    module: {
      loaders: [
        {
          test: context.fileType('text/x-sass'),
          loaders: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.NODE_ENV !== 'development',
                sourceMap: process.env.NODE_ENV !== 'development',
              },
            },
            //{ loader: 'postcss-loader' }, // TODO wendor prefixes, separate block
            { loader: 'resolve-url-loader' },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true, // this should be allways true for 'resolve-url-loader' working
                includePaths: [
                  path.resolve('./src/sass'),
                  path.resolve('./node_modules'),
                ],
                indentedSyntax: true,
                importer: [
                  compassImporter,
                ],
                omitSourceMapUrl: process.env.NODE_ENV !== 'development',
              },
            },
          ],
        },
      ],
    },
  })
}
