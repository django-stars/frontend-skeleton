import webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'

import morgan from 'morgan'
import path from 'path'
import url from 'url'

import {
  createConfig,
  entryPoint,
  setOutput,
  customConfig,
  env,
  sourceMaps,
  setDevTool,
  addPlugins,
} from '@webpack-blocks/webpack2'

import babel from '@webpack-blocks/babel6'
import devServer from '@webpack-blocks/dev-server2'
import extractText from '@webpack-blocks/extract-text2'

import pug from './webpack-blocks/pug'
import sass from './webpack-blocks/sass'

//import ng2 from './webpack-blocks/ng2'
import react from './webpack-blocks/react'

// configure environment
import dotenv from 'dotenv'
import fs from 'fs'

var envFile = process.env.ENVFILE || '.env/local';
if (!fs.existsSync(envFile)) {
  var envFile = process.env.ENVFILE || '.env/dev';
}
if (!fs.existsSync(envFile)) {
  throw 'no env file'
}
var envConfig = dotenv.config({ path: envFile });

module.exports = createConfig([
  entryPoint({
    app: 'app.jsx',
    //styles: './src/sass/app.sass',
    // you can add you own entries here (also check CommonsChunkPlugin)
  }),

  customConfig({
    target: envConfig.ELECTRON ? 'electron-renderer' : 'web',
    resolve: {
      modules: [
        path.resolve('./src/app'),
        'node_modules',
      ],
      extensions: ['.js', '.jsx', '.json', '.pug', '.css', '.sass', '.scss'],
    },
  }),

  setOutput({
    path: path.resolve(`${process.env.OUTPUT_PATH}/${process.env.PUBLIC_PATH}`),
    publicPath: '/' + process.env.PUBLIC_PATH + '/',
    filename: '[name].js',
    // TODO check why we need this (HMR?)
    chunkFilename: '[id].chunk.js',
    pathinfo: process.env.NODE_ENV == 'development',
  }),

  babel(),
  pug(envConfig),
  sass(),

  //ng2(),
  react(),

  addPlugins([
    // Injects bundles in your index file instead of wiring all manually.
    // you can use chunks option to exclude some bundles and add separate entry point
    // TODO entry for tests?
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      inject: 'body',
      hash: true,
      filename: path.resolve(`${process.env.OUTPUT_PATH}/index.html`)
    }),

    // FIXME it seems we don't need this, instead use right resolve rules
    new CopyWebpackPlugin([
      {
        context: path.resolve('./src'),
        from: 'img/**/*',
        to: ''
      },
      /*{
        context: path.resolve('./src'),
        from: 'fonts/** /*',
        to: ''
      }*/
    ], {
      ignore: [
        'img/sprites/**/*'
      ]
    }),

    // common code
    // Automatically move all modules defined outside of application directory to vendor bundle.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1;
      }
    }),

    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      watch: true,
    }),
  ]),

  env('development', [
    devServer({
      contentBase: path.resolve(`${process.env.OUTPUT_PATH}`),
      port: process.env.DEV_SERVER_PORT || 3000,
      setup: function (app) {
        app.use(morgan('dev'));
      },
      hot: true,
    }),
    devServer.proxy(configureProxy()),
    sourceMaps(),
    setDevTool('eval'),
    // perfect but so slow
    //setDevTool('source-map'),
    addPlugins([
      // write generated files to filesystem (for debug)
      new WriteFilePlugin(),

    ]),
  ]),

  env('production', [
    extractText('app.[contenthash:8].css'),
    extractText('app.[contenthash:8].css', 'text/x-sass'),

    addPlugins([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]),
  ]),
])

function configureProxy() {
  if (process.env.NODE_ENV != 'development') {
    return []
  }
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

  var ret = [Object.assign({}, options, {
    context: context,
  })];

  return ret
}
