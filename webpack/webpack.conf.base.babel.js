import path from 'path'
import autoprefixer from 'autoprefixer'

const projectRootPath = path.resolve(__dirname, '../')

export default {
  debug: true,
  noInfo: true,
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      'client': path.resolve(__dirname, '../client'),
      'app': path.resolve(__dirname, '../client/app'),
      'server': path.resolve(__dirname, '../server'),
      'styles': path.resolve(__dirname, '../client/styles')
    },
    modulesDirectories: ['node_modules', 'shared']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: projectRootPath,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRootPath,
        exclude: /node_modules/
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: path.posix.join('static', 'img/[name].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: path.posix.join('static', 'fonts/[name].[ext]')
        }
      }, {
        test: /\.ico$/,
        loader: 'file-loader',
        query: {
          name: '[name].ico'
        }
      }
    ]
  },
  eslint: {
    configFile: path.resolve(__dirname, '../.eslintrc')
  },
  postcss: [
    autoprefixer({browsers: ['last 2 versions']})
  ]
}
