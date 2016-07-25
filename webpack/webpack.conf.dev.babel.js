import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

import baseWebpackConfig from './webpack.conf.base.babel'
import {HOST, PORT, BROWSER_SYNC_PORT} from './config'

const externalPath = `http://${HOST}:${PORT}/`
const publicPath = (HOST === '0.0.0.0') ? '/' : externalPath

export default webpackMerge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  entry: {
    app: [
      'eventsource-polyfill', // IE HMR fix
      `webpack-hot-middleware/client?reload=true&path=${publicPath}__webpack_hmr`, // HMR works calling js from external server
      './webpack/client.js',
      './client/app/main.js'
    ]
  },
  output: {
    publicPath: publicPath, // chunks works calling js from external server
    filename: '[name].js',
    chunkFilename: 'chunk.[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.scss/,
        loaders: ['style', 'css?sourceMap!postcss-loader', 'sass?sourceMap']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // enable HMR
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      inject: true
    }),
    new BrowserSyncPlugin({
      host: HOST,
      port: BROWSER_SYNC_PORT,
      // proxy the Webpack Dev Server endpoint
      proxy: externalPath
    }, {
      // prevent BrowserSync from reloading the page
      reload: false
    })
  ]
})
