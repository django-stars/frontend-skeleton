import { addPlugins, group, env } from 'webpack-blocks'
import SentryWebpackPlugin from '@sentry/webpack-plugin'

const isSentryConfigured = process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT &&
  process.env.SENTRY_AUTH_TOKEN &&
  process.env.SENTRY_DSN

if(isSentryConfigured) {
  process.env.SENTRY_URL = new URL(process.env.SENTRY_DSN).origin
}

export default function(config) {
  return group([
    env('production', [
      addPlugins([
        isSentryConfigured && new SentryWebpackPlugin({
          include: 'src/app',
          ignoreFile: '.sentrycliignore',
        }),
      ].filter(Boolean)),
    ]),
  ])
}
