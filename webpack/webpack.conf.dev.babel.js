import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import baseWebpackConfig from './webpack.conf.base.babel'
import {HOST, PORT} from './config'

const PUBLIC_PATH = (HOST === '0.0.0.0') ? '/' : `http://${HOST}:${PORT}/`

export default webpackMerge(baseWebpackConfig, {
  devtool: '#eval-source-map',
  entry: {
    app: [
      'eventsource-polyfill', // IE HMR fix
      `webpack-hot-middleware/client?reload=true&path=${PUBLIC_PATH}__webpack_hmr`, // HMR works calling js from external server
      './webpack/client.js',
      './client/app/main.js'
    ]
  },
  output: {
    publicPath: PUBLIC_PATH, // chunks works calling js from external server
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
    })
  ]
})
