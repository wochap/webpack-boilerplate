import path from 'path'
import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import ManifestPlugin from 'webpack-manifest-plugin'

import webpackConfigBase from './config.base.babel'
import {projectRootPath, templatePath} from '../config'

export default webpackMerge(webpackConfigBase, {
  devtool: 'source-map',
  entry: {
    app: path.join(projectRootPath, 'src/app/main.js')
  },
  output: {
    publicPath: '/',
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('css?sourceMap!postcss-loader')
      }, {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract('css?sourceMap!postcss-loader!sass?sourceMap')
      }
    ]
  },
  plugins: [
    // define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // OccurrenceOrderPlugin is needed for long-term caching to work properly
    // see http://mxs.is/googmv
    new webpack.optimize.OccurrenceOrderPlugin(),
    // merge all duplicate modules
    new webpack.optimize.DedupePlugin(),
    // minify and optimize the javaScript
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(projectRootPath, 'node_modules')) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // extract the CSS into a separate file
    new ExtractTextPlugin('static/css/[name].[contenthash].css'),
    // minify and optimize the index.html
    new HtmlWebpackPlugin({
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      inject: true,
      template: templatePath,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    // this will generate a webpack-manifest.json file
    new ManifestPlugin({
      fileName: 'webpack-manifest.json',
      basePath: '/'
    })
  ]
})
