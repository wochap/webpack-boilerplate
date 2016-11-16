import path from 'path'
import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

import webpackConfigBase from './config.base.babel'
import {CURRENT_IP, WEBPACK_SERVER_PORT, BROWSER_SYNC_PORT, projectRootPath, projectSourcePath, templatePath} from '../config'

const externalPath = `http://${CURRENT_IP}:${WEBPACK_SERVER_PORT}/`

export default webpackMerge(webpackConfigBase, {
  devtool: 'eval',
  entry: {
    app: [
      // fix HMR in IE
      'eventsource-polyfill',
      // allow HMR in this entry point, with correct path
      `webpack-hot-middleware/client?reload=true&path=${externalPath}__webpack_hmr`,
      // force page reload when html-webpack-plugin template changes
      path.resolve(__dirname, './client.js'),

      path.join(projectSourcePath, 'app/main.js')
    ]
  },
  output: {
    publicPath: externalPath, // chunks works calling js from external server
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader']
      }, {
        test: /\.scss/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    // define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: templatePath,
      inject: true
    }),
    // start BrowserSync server, for cross browser development
    // https://github.com/Va1/browser-sync-webpack-plugin
    new BrowserSyncPlugin({
      open: false,
      port: BROWSER_SYNC_PORT,
      // proxy the Webpack Dev Server endpoint
      proxy: externalPath
    }, {
      // prevent BrowserSync from reloading the page
      reload: false
    })
  ]
})
