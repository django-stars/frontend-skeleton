const eslint = require('eslint')
const path = require('path')
const pkg = require('./package.json')

const opts = {
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs.url,
  eslint: eslint,
  cmd: 'linter',
  eslintConfig: {
    configFile: path.join(__dirname, '.eslintrc.json'),
  },
  cwd: '',
}

require('standard-engine').cli(opts)
