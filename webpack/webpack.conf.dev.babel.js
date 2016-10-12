import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import path from 'path'

import baseWebpackConfig from './webpack.conf.base.babel'
import {CURRENT_IP, WEBPACK_SERVER_PORT, BROWSER_SYNC_PORT} from './config'

const externalPath = `http://${CURRENT_IP}:${WEBPACK_SERVER_PORT}/`

export default webpackMerge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  entry: {
    app: [
      'eventsource-polyfill', // IE HMR fix
      `webpack-hot-middleware/client?reload=true&path=${externalPath}__webpack_hmr`, // HMR works calling js from external server
      path.resolve(__dirname, '../webpack/client.js'),
      path.resolve(__dirname, '../src/app/main.js')
    ]
  },
  output: {
    publicPath: externalPath, // chunks works calling js from external server
    filename: '[name].js',
    chunkFilename: 'chunk.[id].js'
  },
  module: {
    loaders: [
      {
        test: /\.css/,
        loaders: ['style', 'css?sourceMap!postcss-loader']
      }, {
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
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    }),
    new BrowserSyncPlugin({
      port: BROWSER_SYNC_PORT,
      // proxy the Webpack Dev Server endpoint
      proxy: externalPath
    }, {
      // prevent BrowserSync from reloading the page
      reload: false
    })
  ]
})
