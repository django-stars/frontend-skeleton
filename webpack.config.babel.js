import './init-env' // SHOULD BE FIRST

import path from 'path'
import webpack from 'webpack'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import {
  addPlugins,
  createConfig,
  devServer,
  env,
  entryPoint,
  resolve,
  setEnv,
  setOutput,
  sourceMaps,
  uglify,
} from 'webpack-blocks'

import {
  babel,
  mpa,
  postcss,
  // react,
  // sass,
  // spa
} from './presets'


module.exports = createConfig([

  entryPoint({
    bundle: 'index.js',
    // styles: './src/sass/app.sass',
    // you can add you own entries here (also check CommonsChunkPlugin)
  }),

  resolve({
    modules: [
      path.resolve(`${process.env.SOURCES_PATH}/app`),
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss'],
  }),

  setOutput({
    path: path.resolve(`${process.env.OUTPUT_PATH}/${process.env.PUBLIC_PATH}`),
    publicPath: `/${process.env.PUBLIC_PATH}/`,
    // NOTE: 'name' here is the name of entry point
    filename: '[name].js',
    // TODO check why we need this (HMR?)
    // chunkFilename: '[id].chunk.js',
    pathinfo: process.env.NODE_ENV === 'development',
  }),

  setEnv([
    // pass env values to compile environment
    'BACKEND_URL', 'API_URL', 'PUBLIC_PATH', 'AUTH_HEADER',
  ]),

  addPlugins([
    // move all modules defined outside of application directory to vendor bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vundle',
      filename: '[name].js',
      minChunks: function(module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1
      },
    }),

    // clean distribution folder before compile
    new CleanWebpackPlugin([process.env.OUTPUT_PATH], { root: __dirname }),
  ]),

  env('development', [
    devServer({
      contentBase: path.resolve(`${process.env.OUTPUT_PATH}`),
      port: process.env.DEV_SERVER_PORT || 3000,
      overlay: true,
      clientLogLevel: 'info', // FIXME move to VERBOSE mode (add loglevel/verbose option)
      stats: 'minimal',
      /*
      setup: function(app) {
        app.use(morgan('dev'))
      },
      */
      // disableHostCheck: true,
    }),
    sourceMaps('eval-source-map'),

    /*
    addPlugins([
      // write generated files to filesystem (for debug)
      new WriteFilePlugin(),
    ]),
    */
  ]),

  env('production', [
    uglify(),
  ]),

  // spa(),
  mpa(),

  babel(),
  // react(),

  // sass(),
  postcss(),
])
