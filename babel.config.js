const presets = [
  [
    '@babel/preset-env',
    {
      modules: false,
    },
  ],
]
const commonPlugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
]
const clientPlugins = [
  ...commonPlugins,
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: 3,
    },
  ],
]

module.exports = {
  env: {
    test: {
      presets: presets,
      plugins: [
        ...commonPlugins,
        'transform-es2015-modules-commonjs',
        'dynamic-import-node',
      ],
    },
    development: {
      presets,
      plugins: clientPlugins,
    },
    production: {
      presets,
      plugins: clientPlugins,
    },
  },
}
