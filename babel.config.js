module.exports = {
  'sourceType': 'module',
  'compact': false,
  'presets': [[
    '@babel/preset-env',
    {
      'useBuiltIns': 'usage',
      'corejs': {
        'version': 3,
        'proposals': true,
      },
    },
  ]],
  'plugins': [
  // stage 2
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    '@babel/plugin-transform-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    // stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-transform-class-properties', { 'loose': false }],
    '@babel/plugin-transform-json-strings',
    '@babel/plugin-transform-export-namespace-from',
  ],
  'env': {
    'test': {
      'presets': ['@babel/preset-react', '@babel/preset-flow'],
      'plugins': [
        'babel-plugin-react-require',
      ],
    },
  },
}
