import { group, babel } from 'webpack-blocks'


export default function(config) {
  return group([
    babel({
      presets: [
        'react',
      ],

      plugins: [
        'react-require',
        // need for react HMR
        // 'extract-hoc/babel',
        'react-hot-loader/babel',
      ],
    }),

  ])
}
