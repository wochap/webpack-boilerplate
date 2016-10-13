# Documentation

This boilerplate assumes you are somewhat familiar with Webpack.

**It is recommended to use npm 3+ for a more efficient dependency tree.**

## Project structure

```
.
├── yarn.lock                 # https://yarnpkg.com/en/docs/yarn-lock
├── .babelrc                  # babel config
├── .editorconfig             # editor config
├── .eslintrc                 # eslint config
├── .eslintignore             # eslint ignore config
├── .nvmrc                    # nvm config
├── package.json              # build scripts and dependencies
├── src/                      # source code
│   ├── app/
│   │   └── main.js           # app entry file
│   ├── styles
│   │   └── main.scss         # main sass file
│   ├── favicon.ico           # favicon to keep your browser from throwing a 404 during dev
│   └── index.html            # index.html template
└── build/                    # build scripts files (webpack)
    └── ...
```
