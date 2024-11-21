import { addPlugins } from 'webpack-blocks'
import { ProvidePlugin } from 'webpack'

export default function(config) {
  return addPlugins([
    new ProvidePlugin({
      gettext: ['ds-frontend/packages/i18n', 'gettext'],
      pgettext: ['ds-frontend/packages/i18n', 'pgettext'],
      ngettext: ['ds-frontend/packages/i18n', 'ngettext'],
      npgettext: ['ds-frontend/packages/i18n', 'npgettext'],
      interpolate: ['ds-frontend/packages/i18n', 'interpolate'],
    }),
  ])
}
