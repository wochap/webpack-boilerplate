# Webpack boilerplate

A highly scalable and simple webpack boilerplate for **client** apps.

## Quick start

Rename `.env.example` to `.env`. Then:

```sh
# install dependencies
$ yarn

# serve with hot reload
$ yarn build:watch
# or
$ yarn dev

# serve with hot reload and inspect webpack dev server
# https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js
$ yarn dev:inspect

# build for production with minification
$ yarn build

# run tests
$ yarn test

# run tests and watch
$ yarn test:watch

# run test coverage report
$ yarn test:coverage
```

**NOTE: For disable sourceMap (on production only), just remove it from `.env` file.**

## Documentation

### Features

* HMR
* CSS < PostCSS < SCSS
* JS < ES2015 < ESLint
* Browser Sync
* Images and fonts well configured.
* Long term caching.
* Tree shaking.
* Tests with Jest.

### Boilerplate structure

```
.
├── .babelrc                  # babel config
├── .editorconfig             # editor config
├── .env.example              # env variables example
├── .eslintignore             # eslint ignore config
├── .eslintrc                 # eslint config
├── .gitignore                # git ignore config
├── .nvmrc                    # nvm config
├── .tern-project             # atom-ternjs project config
├── package.json              # https://docs.npmjs.com/files/package.json
├── postcss.config.js         # postcss config
├── README.md                 # this file
├── webpack.config.js         # webpack config
├── yarn.lock                 # https://yarnpkg.com/en/docs/yarn-lock
├── coverage/                 # jest coverage output
├── dist/                     # webpack build output
├── test/                     # jest config
├── lib/                      # future external packages
├── public/                   # files that will be copied to dist
└── src/                      # source code
    ├── app/
    │   └── main.js           # app entry file
    ├── styles/
    │   └── main.scss         # main scss file
    └── index.html            # template used by html-webpack-plugin
```

### Troubleshooting

* `Module build failed: Error: ENOENT: no such file or directory, scandir`

Rebuild node-sass

```sh
$ npm rebuild node-sass
```

## TODO

- [ ] Refresh on each html-webpack-plugin template change.
- [ ] Ignore webpack modules (e.g.: buffer, style-loader, etc) in production build.
- [ ] Remove extra logs on production build.
