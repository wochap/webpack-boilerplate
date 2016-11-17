const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  'root': true,
  'extends': [
    'plugin:import/errors',
    'plugin:import/warnings',
    'standard'
  ],
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack/config.base.babel.js'
      }
    }
  },
  rules: {
    'no-console': DEBUG ? 0 : 2,
    'no-debugger': DEBUG ? 0 : 2
  }
}
