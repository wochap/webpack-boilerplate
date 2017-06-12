const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  parser: 'babel-eslint',
  plugins: [
    'flowtype-errors'
  ],
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'standard',
    'standard-react'
  ],
  settings: {
    'import/resolver': 'eslint-import-resolver-webpack'
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    'flowtype-errors/show-errors': 2,
    'jsx-quotes': ["error", "prefer-double"],
    'no-console': isProduction ? 2 : 0,
    'no-debugger': isProduction ? 2 : 0
  }
}
