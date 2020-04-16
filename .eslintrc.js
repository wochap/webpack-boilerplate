const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'standard',
    'plugin:prettier/recommended'
  ],
  settings: {
    'import/resolver': {
      webpack: 'webpack.config.js',
    },
  },
  env: {
    amd: true,
    node: true,
    es6: true,
    jest: true,
    browser: true,
    mocha: true,
  },
  rules: {
    'prettier/prettier': 'error',

    'no-console': isProduction ? 2 : 0,
    'no-debugger': isProduction ? 2 : 0,

    'import/no-unresolved': [0],
  }
}
