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
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'file-loader',
        include: projectSourcePath,
        query: {
          name: 'static/img/[name].[ext]'
        }
      }, {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
        include: projectSourcePath,
        query: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: 'static/img/[name].[ext]'
        }
      }, {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader',
        include: projectSourcePath,
        query: {
          name: 'static/fonts/[name].[ext]'
        }
      }, {
        test: /\.otf(\?.*)?$/,
        loader: 'url-loader',
        include: projectSourcePath,
        query: {
          limit: 10000,
          mimetype: 'font/opentype',
          name: 'static/fonts/[name].[ext]'
        }
      }, {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
        include: projectSourcePath,
        query: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: 'static/fonts/[name].[ext]'
        }
      }, {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader',
        include: projectSourcePath,
        query: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: 'static/fonts/[name].[ext]'
        }
      }, {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader',
        include: projectSourcePath,
        query: {
          limit: 10000,
          mimetype: 'application/font-woff2',
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
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9'
      ]
    })
  ]
}
