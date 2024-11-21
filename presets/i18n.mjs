import webpackBlocks from 'webpack-blocks'
import webpack from 'webpack'

const { addPlugins } = webpackBlocks


export default function(config) {
  return addPlugins([
    new webpack.ProvidePlugin({
      gettext: ['ds-frontend/packages/i18n', 'gettext'],
      pgettext: ['ds-frontend/packages/i18n', 'pgettext'],
      ngettext: ['ds-frontend/packages/i18n', 'ngettext'],
      npgettext: ['ds-frontend/packages/i18n', 'npgettext'],
      interpolate: ['ds-frontend/packages/i18n', 'interpolate'],
    }),
  ])
}
