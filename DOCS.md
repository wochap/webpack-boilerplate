# Documentation

This boilerplate assumes you are somewhat familiar with Webpack.

**It is recommended to use npm 3+ for a more efficient dependency tree.**

## Project structure

```
.
├── .babelrc                  # babel config
├── .editorconfig             # editor config
├── .eslintrc                 # eslint config
├── .eslintignore             # eslint ignore config
├── .nvmrc                    # nvm config
├── .tern-project             # atom-ternjs project config
├── package.json              # https://docs.npmjs.com/files/package.json
├── yarn.lock                 # https://yarnpkg.com/en/docs/yarn-lock
├── src/                      # source code
│   ├── app/
│   │   └── main.js           # app entry file
│   ├── styles
│   │   └── main.scss         # main sass file
│   ├── favicon.ico           # favicon to keep your browser from throwing a 404 during dev
│   └── index.html            # template used by html-webpack-plugin
└── build/                    # build tools (webpack)
    ├── config                # config used by tasks and webpack
    ├── tasks                 # like gulp tasks
    └── webpack               # webpack config files
```
