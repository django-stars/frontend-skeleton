import { babel, match } from 'webpack-blocks'


export default function(config) {
  return match([/\.(js|jsx)$/], { exclude: /node_modules\/(?!ds-)/ }, [
    babel({
    }),
  ])
}
