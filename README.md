# Basic webpack boilerplate

> Start your next project using technologies that you love

A starting point for your next app

![Demo](https://drive.google.com/uc?export=download&id=0BwM5_eez3JnoVlBCX1NmX1BhelU)

## What’s Inside?

* [Express](http://expressjs.com/) with [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Webpack](https://webpack.github.io/) with:
  - [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)
  - [browser-sync-webpack-plugin](https://github.com/Va1/browser-sync-webpack-plugin)
  - [webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)
  - [postcss-loader](https://github.com/postcss/postcss-loader) with [autoprefixer](https://github.com/postcss/autoprefixer)
  - [sass-loader](https://github.com/jtangelder/sass-loader)
  - [eslint-loader](https://github.com/MoOx/eslint-loader)
  - [babel-loader](https://github.com/babel/babel-loader)
  - [url-loader](https://github.com/webpack/url-loader)
  - [file-loader](https://github.com/webpack/file-loader)
* [ESLint](http://eslint.org/) with [eslint-config-standard](https://github.com/feross/eslint-config-standard), [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import) and [eslint-import-resolver-webpack](https://www.npmjs.com/package/eslint-import-resolver-webpack)
* [Babel](http://babeljs.io/) with [preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/) and [plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime)
* [Jest](https://facebook.github.io/jest/)

## Development

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# run all tests
$ npm run test

# build for production with minification and serve dist files at localhost:8080
$ npm run build
```

In development, if you are working with a backend like [Laravel](https://laravel.com/), you will need to add a script to your template file:

```html
...
<script src="http:/[localhost|ip]:[port]/app.js"></script>
...
```

Use `IP` if you run your app from external devices.
