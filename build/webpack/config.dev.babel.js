import path from 'path'
import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import BrowserSyncPlugin from 'browser-sync-webpack-plugin'

import webpackConfigBase from './config.base.babel'
import {CURRENT_IP, WEBPACK_SERVER_PORT, BROWSER_SYNC_PORT, projectRootPath, templatePath} from '../config'

const externalPath = `http://${CURRENT_IP}:${WEBPACK_SERVER_PORT}/`

export default webpackMerge(webpackConfigBase, {
  devtool: 'eval',
  entry: {
    app: [
      'eventsource-polyfill', // IE HMR fix
      `webpack-hot-middleware/client?reload=true&path=${externalPath}__webpack_hmr`, // HMR works calling js from external server
      path.resolve(__dirname, './client.js'), // force page reload when html-webpack-plugin template changes
      path.join(projectRootPath, 'src/app/main.js')
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
        loaders: ['style', 'css-loader', 'postcss-loader']
      }, {
        test: /\.scss/,
        loaders: ['style', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // enable HMR
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: templatePath,
      inject: true
    }),
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
