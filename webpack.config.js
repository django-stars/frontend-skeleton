var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WriteFilePlugin = require('write-file-webpack-plugin');
var compassImporter = require('compass-importer');
var _ = require('lodash');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var morgan  = require('morgan');
var url     = require('url');

/*var config = {
  paths: {
    static: 'static',
  }
}*/

// configure environment
var envFile = process.env.ENVFILE || '.env/local';
var envConfig = require('dotenv').config({path: envFile});

module.exports = {
  resolve: {
    root: path.resolve('./src/app'),
    // TODO add all possible/usage extensions
    extensions: ['', '.js', '.pug', '.html', '.css', '.sass', '.scss'],
  },

  debug: true,
  devtool: 'source-map',

  entry: {
    app: 'app.js',
    // you can add you own entries here (also check CommonsChunkPlugin)
  },

  output: {
    path: path.resolve(process.env.STATIC_PATH),
    publicPath: "/",
    //filename: "build/app.js"
    filename: "static/[name].js",
    // TODO check why we need this
    chunkFilename: "[id].chunk.js"
  },

  module: {
    loaders: [
      { test: /\.html$/, loader: 'raw' },
      {
        test: /\.sass$|\.css$/,
        // NOTE ?sourceMap option need for resolve-url-loader plugin properly working
        // don't worry about prod build, all will be fine
        loader: ExtractTextPlugin.extract(['css-loader?sourceMap', 'resolve-url-loader', 'sass-loader?sourceMap'])
      },
      {
        test: /\.js$/,
        //exclude: /(node_modules|build)/,
        loaders: [
          'ng-annotate-loader',
          'babel-loader',
        ]
      },
      /*{
        test: /\.pug$/,
        exclude: [
          path.resolve('src/app')
        ],
        loader: 'pug-html-loader'
      },*/
      {
        test: /\.pug$/,
        /*include: [
          path.resolve('src/app')
        ],*/
        loader: 'pug-html-loader',
        query: _.assign({}, envConfig, {
          'API_URL': process.env.API_URL
        })
      },
      // media
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff2?$|\.ttf$|\.eot$|\.wav$|\.mp3$/,
        loader: 'file-loader'
      },

      // SHIMS
      /*{
        test: require.resolve('angular'),
        loader: 'imports-loader?jQuery=jquery'
      }*/
    ]
  },

  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // you can use chunks option to exclude some bundles and add separate entry point
    // TODO entry for tests?
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      inject: 'body',
      hash: true
    }),

    // common code
    // Automatically move all modules defined outside of application directory to vendor bundle.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'static/vendor.js',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1;
      }
    }),

    // extract CSS styles to separate file
    // TODO use separate entry for css?
    new ExtractTextPlugin('static/app.css', {
      allChunks: true
    }),

    // write generated files to filesystem (for debug)
    new WriteFilePlugin(),

    // need for the angular
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      'jQuery': 'jquery'
    }),

    // FIXME it seems we don't need this, instead use right resolve rules
    new CopyWebpackPlugin([
      {
        context: path.resolve('./src'),
        from: 'img/**/*',
        to: 'static'
      },
      {
        context: path.resolve('./src'),
        from: 'fonts/**/*',
        to: 'static'
      }
    ]),
  ],

  sassLoader: {
    includePaths: [
      path.resolve('./src/sass'),
      path.resolve('./node_modules'),
    ],
    indentedSyntax: true,
    importer: [
      sprityImporter,
      compassImporter
    ]
  },

  devServer: {
    // output path for WriteFilePlugin
    outputPath: path.resolve(process.env.STATIC_PATH),
    contentBase: path.resolve(process.env.STATIC_PATH),
    port: 3000,
    historyApiFallback: true,
    setup: function(app) {
      app.use(morgan('dev'));
    },
    proxy: configureProxy()
  }
};

var sprity = require('sprity');
// TODO check this deps in package.json
var vfs = require('vinyl-fs');
var through2 = require('through2');

function sprityImporter(importName, cssFilePath, done) {
  if(importName !== 'sprites') {
    return null
  }

  var options = {
    //src: path('{base}/{sprites}/**/*.') + '{png,jpg}',
    src: path.resolve('./src/img/sprites/**/*.{png,jpg}'),
    out: path.resolve(process.env.STATIC_PATH + '/static/img'),
    //cssPath: path('/{destEndpoint}/{images}'),
    style: 'sprites.sass',
    cssPath: '/static/img',
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
        if( _.last(file.path.split('/')) == 'sprites.sass' ) {
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

function configureProxy() {
  // Proxy API requests to backend
  var urlData = url.parse(process.env.BACKEND_URL);
  var backendBaseURL = urlData.protocol + '//' + urlData.host;

  var options = {
    changeOrigin: true,
    target: backendBaseURL,
    secure: false,
    //logLevel: 'debug',
  };

  if (urlData.auth) {
    options.auth = urlData.auth
  }

  var context = [process.env.API_URL].concat(JSON.parse(process.env.PROXY));

  var ret = [_.assign({}, options, {
    context: context,
  })];

  return ret
}
