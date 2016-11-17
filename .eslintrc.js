const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  'root': true,
  'extends': [
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint-config-airbnb'
  ],
  'env': {
    'browser': true,
    'node': true,
    'jest': true
  },
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack/config.base.babel.js'
      }
    }
  },
  rules: {
    'semi': [2,'never'],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'no-console': DEBUG ? 0 : 2,
    'no-debugger': DEBUG ? 0 : 2
  }
}
