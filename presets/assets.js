import { file, group, match } from 'webpack-blocks'

export default function(config) {
  return group([
    // will copy font files to build directory and link to them
    match(['*.eot', '*.ttf', '*.woff', '*.woff2', '*.png', '*.jpg', '*.svg'], [
      file(),
    ]),
  ])
}
