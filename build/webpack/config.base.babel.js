import path from 'path'

import {projectRootPath, projectSourcePath} from '../config'

export default {
  debug: true,
  noInfo: true,
  output: {
    path: path.join(projectRootPath, 'dist')
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      'src': projectSourcePath,
      'app': path.join(projectSourcePath, 'app'),
      'styles': path.join(projectSourcePath, 'styles')
    },
    modulesDirectories: ['node_modules', 'shared']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: projectSourcePath,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectSourcePath,
        exclude: /node_modules/
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: projectSourcePath,
        query: {
          limit: 10000,
          name: 'static/img/[name].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        include: projectSourcePath,
        query: {
          limit: 10000,
          name: 'static/fonts/[name].[ext]'
        }
      }, {
        test: /\.ico$/,
        loader: 'file-loader',
        include: projectSourcePath,
        query: {
          name: '[name].ico'
        }
      }
    ]
  },
  eslint: {
    configFile: path.join(projectRootPath, '.eslintrc.js')
  },
  postcss: [
    require('autoprefixer')({browsers: ['last 2 versions']})
  ]
}
