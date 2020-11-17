import { group, babel } from 'webpack-blocks'


export default function({ ssr = false } = {}) {
  return group([
    babel({
      presets: [
        '@babel/preset-react',
        '@babel/preset-flow',
      ],

      plugins: [
        'babel-plugin-react-require',
        ...(ssr ? [] : ['react-hot-loader/babel']),
      ],
    }),

  ])
}
