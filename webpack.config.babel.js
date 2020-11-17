import './init-env' // SHOULD BE FIRST

import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

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
  when,
  customConfig,
} from 'webpack-blocks'

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
  ssr,
  devServer as devServerPreset,
} from './presets'

const baseConfig = [
  resolve({
    modules: [
      path.resolve(`${process.env.SOURCES_PATH}/app`),
      'node_modules',
    ],

    alias: {
      // ds internal packages mapping
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
    // [name] is entry point name
    filename: '[name].js',
    pathinfo: process.env.NODE_ENV === 'development',
  }),

  setEnv([
    // pass env values to compile environment
    'API_URL', 'AUTH_HEADER', 'MAIN_HOST',
    'CACHE_STATE_KEYS', 'STORAGE_KEY', 'SENTRY_DSN', 'SENTRY_ENVIRONMENT', 'CACHE_STATE_PERSIST_KEYS', 'LIMIT',
  ]),

  // TODO update CleanWebpackPlugin and enable it back for SSR. this needs a lot of testing
  when(!process.env.SSR, [
    addPlugins([
      // clean distribution folder before compile
      new CleanWebpackPlugin(),
    ]),
  ]),


  babel(),
]

const webConfig = createConfig([
  ...baseConfig,

  when(!process.env.NODE_ENV === 'development', [
    resolve({
      alias: {
        // TODO replace with Fast Refresh
        // https://github.com/facebook/react/issues/16604
        'react-dom': '@hot-loader/react-dom',
      }
    })
  ]),

  entryPoint({
    bundle: 'index.js',
  }),

  when(!process.env.SPA, [spa()]),

  customConfig({
    name: 'web',

    optimization: {
      splitChunks: {
        cacheGroups: {
          // move all modules defined outside of application directory to vendor bundle
          vendors: {
            test: function(module, chunk) {
              return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1
            },
            name: 'vundle',
            chunks: 'all',
          },
        },
      },
    },
  }),

  env('development', [
    devServerPreset(),
    sourceMaps('eval-source-map'),
  ]),

  proxy(),
  styles(),
  assets(),
  sentry(),

  react(),
  // sass(),
  // postcss(),
])

const ssrConfig = createConfig([
  ...baseConfig,

  entryPoint({
    ssr: 'ssr.js',
  }),

  resolve({
    alias: {
      '@ds-frontend/api': path.resolve(`${process.env.SOURCES_PATH}/ssr/api.js`),
    }
  }),

  setOutput({
    path: path.resolve(`${process.env.OUTPUT_PATH}/ssr/`),
    libraryTarget: 'commonjs2',
  }),

  setEnv([
    'PROXY_URL',
    'SSR',
  ]),

  customConfig({
    name: 'ssr',
    target: 'node',
  }),

  ssr(),

  react({ ssr: true }),

  assets({ ssr: true }),

  customConfig({
    optimization: { minimize: false },
  }),
])

module.exports = process.env.SSR ? [ webConfig, ssrConfig ] : webConfig
