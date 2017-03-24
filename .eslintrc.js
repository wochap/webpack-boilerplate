const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  root: true,
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'standard'
  ],
  settings: {
    'import/resolver': 'eslint-import-resolver-webpack'
  },
  rules: {
    'no-console': isProduction ? 2 : 0,
    'no-debugger': isProduction ? 2 : 0
  }
}
