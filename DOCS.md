# Documentation

This boilerplate assumes you are somewhat familiar with Webpack.

**It is recommended to use npm 3+ for a more efficient dependency tree.**

## Project structure

```
.
├── .babelrc                  # babel config
├── .editorconfig             # editor config
├── .eslintrc                 # eslint config
├── package.json              # build scripts and dependencies
├── client/                   # client source code
│   ├── app/
│   │   └── main.js           # app entry file
│   ├── styles
│   │   └── main.scss         # main sass file
│   ├── favicon.ico           # favicon to keep your browser from throwing a 404 during dev
│   └── index.html            # index.html template
├── server/                   # server source code
│   └── main.js               # express server, serves dist folder
└── webpack/                  # webpack config files
    └── ...
```
