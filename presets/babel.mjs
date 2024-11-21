import webpackBlocks from 'webpack-blocks'
const { babel, match } = webpackBlocks

export default function(config) {
  return match([/\.(js|jsx)$/], { exclude: /node_modules\/(?!ds-)/ }, [
    babel({
    }),
  ])
}
