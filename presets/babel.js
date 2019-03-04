import { group, babel } from 'webpack-blocks'


export default function(config) {
  return group([
    babel({
      presets: [
        // webpack need modules:false for proper tree-shaking
        // it seems this no more need (https://github.com/babel/babel-loader/issues/521)
        // ['@babel/preset-env', { 'modules': false }],
      ],
    }),

  ])
}
