const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  'root': true,
  'extends': [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'standard'
  ],
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack/webpack.conf.dev.babel.js'
      }
    }
  },
  'parserOptions': {
    'sourceType': 'module',
  },
  rules: {
    'no-console': DEBUG ? 0 : 2,
    'no-debugger': DEBUG ? 0 : 2
  }
}
