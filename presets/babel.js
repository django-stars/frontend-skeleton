import { babel, match } from 'webpack-blocks'


export default function(config) {
  return match([/\.(js|jsx)$/], {
    exclude: [
      /node_modules\/(?!ds-)/,
      /\bcore-js\b/,
      /\bwebpack\b/,
      /\bregenerator-runtime\b/,
    ],
  }, [
    babel({
      sourceType: 'unambiguous',
    }),
  ])
}
