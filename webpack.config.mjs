import './init-env.mjs' // SHOULD BE FIRST

import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'
import webpackBlocks from 'webpack-blocks'
import {
  // postcss,
  react,
  // sass,
  styles,
  spa,
  assets,
  proxy,
  sentry,
  babel,
  devServer,
} from './presets/index.mjs'

const {
  addPlugins,
  createConfig,
  env,
  entryPoint,
  resolve,
  setEnv,
  setOutput,
  sourceMaps,
  when,
  customConfig,
} = webpackBlocks

export default createConfig([

  entryPoint({
    bundle: 'index.js',
    // styles: './src/sass/app.sass',
    // you can add you own entries here (also check SplitChunksPlugin)
    // code splitting guide: https://webpack.js.org/guides/code-splitting/
    // SplitChunksPlugin: https://webpack.js.org/plugins/split-chunks-plugin/
  }),

  resolve({
    modules: [
      path.resolve(`${process.env.SOURCES_PATH}/app`),
      'node_modules',
    ],
    alias: {
      'react-dom': process.env.NODE_ENV !== 'development' ? 'react-dom' : '@hot-loader/react-dom',
      '@ds-frontend/cache': 'ds-frontend/packages/cache',
      '@ds-frontend/api': 'ds-frontend/packages/api',
      '@ds-frontend/i18n': 'ds-frontend/packages/i18n',
      '@ds-frontend/queryParams': 'ds-frontend/packages/queryParams',
      '@ds-frontend/redux-helpers': 'ds-frontend/packages/redux-helpers',
      '@ds-frontend/resource': 'ds-frontend/packages/resource',
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.sass', '.scss'],
  }),

  setOutput({
    path: path.resolve(`${process.env.OUTPUT_PATH}${process.env.PUBLIC_PATH}`),
    publicPath: process.env.PUBLIC_URL,
    // NOTE: 'name' here is the name of entry point
    filename: '[name].js',
    // TODO check are we need this (HMR?)
    // chunkFilename: '[id].chunk.js',
    pathinfo: process.env.NODE_ENV === 'development',
  }),

  setEnv([
    // pass env values to compile environment
    'API_URL', 'AUTH_HEADER', 'MAIN_HOST',
    'CACHE_STATE_KEYS', 'STORAGE_KEY', 'SENTRY_DSN', 'SENTRY_ENVIRONMENT', 'CACHE_STATE_PERSIST_KEYS', 'LIMIT',
    'NODE_ENV', 'APP_NAME',
  ]),

  addPlugins([
    // clean distribution folder before compile
    new CleanWebpackPlugin(),
  ]),

  customConfig({
    mode: process.env.NODE_ENV ?? 'development',
    optimization: {
      splitChunks: {
        cacheGroups: {
          // move all modules defined outside of application directory to vendor bundle
          defaultVendors: {
            test: function(module) {
              return module.resource && module.resource.indexOf(path.resolve('src')) === -1
            },
            name: 'vundle',
            chunks: 'all',
          },
        },
      },
    },
  }),

  env('development', [
    devServer({
      static: {
        directory: path.resolve(`${process.env.OUTPUT_PATH}`),
      },
      port: process.env.DEV_SERVER_PORT || 3000,
      host: process.env.DEV_SERVER_HOST || 'local-ip',
      allowedHosts: [
        '.localhost',
        `.${process.env.MAIN_HOST}`,
      ],
      hot: true,
      client: {
        overlay: false,
      },
    }),
    sourceMaps('eval-source-map'),

    addPlugins([
      // write generated files to filesystem (for debug)
      // FIXME are we realy need this???
      new WriteFilePlugin(),
    ]),
  ]),

  when(!process.env.SSR, [spa()]),
  proxy(),

  babel(),
  react(),
  sentry(),
  // sass(),
  styles(),
  // postcss(),
  assets(),
])
