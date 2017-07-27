module.exports = sass

var path = require('path')
var compassImporter = require('compass-importer');
var sprity = require('sprity');
var vfs = require('vinyl-fs');
var through2 = require('through2');
var _ = require('lodash');

function sass (options) {
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
                minimize: process.env.NODE_ENV != 'development',
                sourceMap: process.env.NODE_ENV != 'development',
              }
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
                  sprityImporter,
                  compassImporter
                ],
                omitSourceMapUrl: process.env.NODE_ENV != 'development',
              }
            }
          ]
        }
      ]
    }
  })
}

function sprityImporter(importName, cssFilePath, done) {
  if(importName !== 'sprites') {
    return null
  }

  var options = {
    //src: path('{base}/{sprites}/**/*.') + '{png,jpg}',
    src: path.resolve('./src/img/sprites/**/*.{png,jpg}'),
    out: path.resolve(`${process.env.OUTPUT_PATH}/${process.env.PUBLIC_PATH}/img`),
    //cssPath: path('/{destEndpoint}/{images}'),
    style: 'sprites.sass',
    cssPath: `/${process.env.PUBLIC_PATH}/img`,
    name: Math.floor(Date.now() / 1000), // uniq sprite file name
    split: true,
    prefix: 'sprite',
    //template: path('{base}/sprity.sass.hbs'),
    template: '/src/sprity.scss.hbs',
    dimensions: [
      {"ratio": 1, "dpi": 72},
      {"ratio": 2, "dpi": 192}
    ]
  }

  var retSass;
  sprity.src(options)
    .on('error', handleCallbackError(done))
    // FIXME
    // https://github.com/sass/node-sass/issues/1192
    // https://github.com/sass/libsass/issues/1695
    .pipe(
      through2.obj(function(file, enc, cb){
        if( _.last(file.path.split(path.sep)) == 'sprites.sass' ) {
          retSass = file.contents.toString()
        } else {
          // push all except 'sprites.sass'
          this.push(file)
        }
        return cb();
      })
    )
    .pipe( vfs.dest(function (file) {
      return file.base;
    }))
    .on('error', handleCallbackError(done))
    .on('end', function () {
      // TODO generate error if !retSass
      if(!isSprityRaisedError) {
        done({ contents: retSass })
      }
    });

}

var isSprityRaisedError = false;
// TODO get it from original skeleton
var handleCallbackError = function (cb) {
  return function (err) {
    isSprityRaisedError = true;
    if (_.isFunction(cb)) {
      cb(err);
    }
  };
};

