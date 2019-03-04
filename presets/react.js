import { group, babel } from 'webpack-blocks'


export default function(config) {
  return group([
    babel({
      presets: [
        '@babel/preset-react',
        '@babel/preset-flow',
      ],

      plugins: [
        'babel-plugin-react-require',
        // need for react HMR
        // 'extract-hoc/babel',
        'react-hot-loader/babel',
      ],
    }),

  ])
}
