// express server with webpack middlewares

process.env.NODE_ENV = 'development'

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import express from 'express'

import devWebpackConfig from './webpack.conf.dev.babel'
import {HOST, PORT} from './config'

const app = express()

const compiler = webpack(devWebpackConfig)
const middleware = webpackMiddleware(compiler, {
  publicPath: devWebpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})
const hotMiddleware = webpackHotMiddleware(compiler)

// TODO: force page reload when html-webpack-plugin template changes

app.use(middleware)
app.use(hotMiddleware) // disply errors on browser

app.listen(PORT, HOST, function () {
  console.log(`Webpack server listening at http://${HOST}:${PORT}\n`)
})
