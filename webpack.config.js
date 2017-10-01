require('dotenv-extended').load({
  errorOnMissing: true
})

const {resolve} = require('path')
const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const {getIfUtils, removeEmpty} = require('webpack-config-utils')

const CURRENT_IP = require('my-local-ip')()
const externalPath = `http://${CURRENT_IP}:${process.env.WEBPACK_SERVER_PORT}/`
const {ifProduction, ifNotProduction, ifDevelopment} = getIfUtils(process.env.NODE_ENV)
const rootNodeModulesPath = resolve(__dirname, 'node_modules')

const generateStyleLoaders = (...loaders) => (
  loaders.map(loader => (
    {
      loader,
      options: {
        sourceMap: !!process.env.SOURCE_MAP
      }
    }
  ))
)

module.exports = {
  context: resolve(__dirname, 'src'),
  devtool: ifProduction(!!process.env.SOURCE_MAP && 'source-map', 'cheap-module-eval-source-map'),
  stats: {
    colors: true,
    children: false,
    chunks: false,
    chunkModules: false,
    modules: false
  },
  devServer: {
    port: process.env.WEBPACK_SERVER_PORT,
    disableHostCheck: true,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },

    // handle fallback for HTML5 history API
    historyApiFallback: true,

    // show compile errors
    overlay: true,

    // serve public folder
    contentBase: resolve(__dirname, 'public'),
    watchContentBase: true,

    // enable HMR on the server
    hot: true,

    // match the output `publicPath`
    publicPath: ifProduction('/', externalPath),

    // webpack build logs config
    stats: {
      colors: true,
      chunks: false
    }
  },
  entry: {
    app: removeEmpty([
      // fix HMR in IE
      ifDevelopment('eventsource-polyfill'),

      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint
      // it enable HMR from external devices
      ifDevelopment(`webpack-dev-server/client?${externalPath}`),

      './app/main.js'
    ])
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'src': resolve(__dirname, 'src'),
      'app': resolve(__dirname, 'src/app'),
      'styles': resolve(__dirname, 'src/styles'),
      'lib': resolve(__dirname, 'lib')
    },
    modules: ['node_modules', 'shared']
  },
  output: {
    publicPath: ifDevelopment(externalPath, '/'),
    filename: ifProduction('static/js/bundle.[name].[chunkhash:8].js', 'bundle.[name].js'),
    chunkFilename: ifProduction('static/js/chunk.[name].[chunkhash:8].js', 'chunk.[name].js'),
    path: resolve(__dirname, 'dist'),
    pathinfo: ifNotProduction()
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter'),
          cache: ifDevelopment()
        }
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          cacheDirectory: ifDevelopment()
        }
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: generateStyleLoaders('css-loader', 'postcss-loader')
            }),
            scss: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: generateStyleLoaders('css-loader', 'postcss-loader', 'sass-loader')
            })
          }
        }
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: generateStyleLoaders('css-loader', 'postcss-loader')
        })
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: generateStyleLoaders('css-loader', 'postcss-loader', 'sass-loader')
        })
      }, {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: ifProduction('static/img/[name].[hash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: ifProduction('static/img/[name].[hash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.eot(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/vnd.ms-fontobject',
          name: ifProduction('static/fonts/[name].[hash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.otf(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'font/opentype',
          name: ifProduction('static/fonts/[name].[hash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: ifProduction('static/fonts/[name].[hash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: ifProduction('static/fonts/[name].[hash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff2',
          name: ifProduction('static/fonts/[name].[hash:8].[ext]', '[name].[ext]')
        }
      }
    ]
  },
  plugins: removeEmpty([
    // define globals
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: ifDevelopment('"development"', '"production"')
      }
    }),

    new webpack.LoaderOptionsPlugin({
      // css loader config
      minimize: ifProduction(),

      debug: ifNotProduction()
    }),

    // any required modules inside node_modules are extracted to vendor
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks ({resource}, count) {
        return resource &&
          /\.js$/.test(resource) &&
          resource.indexOf(rootNodeModulesPath) === 0
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vue',
      minChunks ({resource}) {
        const targets = ['vue', 'vue-router', 'vuex', 'vuex-router-sync']

        return resource &&
          /\.js$/.test(resource) &&
          resource.indexOf(rootNodeModulesPath) === 0 &&
          targets.find(t => new RegExp(`${rootNodeModulesPath}/${t}/`, 'i').test(resource))
      }
    }),

    // extract manifest
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    // catch all - anything used in more than one place
    // ifProduction(
    //   new webpack.optimize.CommonsChunkPlugin({
    //     async: 'common',
    //     minChunks (module, count) {
    //       return count >= 2
    //     }
    //   })
    // ),

    ifProduction(
      new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
      })
    ),

    // ensures npm install <library> forces a project rebuild
    ifDevelopment(new WatchMissingNodeModulesPlugin(rootNodeModulesPath)),

    // enable HMR globally
    ifDevelopment(new webpack.HotModuleReplacementPlugin()),
    // don't compile if error
    ifDevelopment(new webpack.NoEmitOnErrorsPlugin()),

    // prints more readable module names in the browser console on HMR updates
    ifNotProduction(new webpack.NamedModulesPlugin()),

    ifProduction(
      // minify and optimize the javaScript
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: !!process.env.SOURCE_MAP,
        compress: {
          screw_ie8: true,
          warnings: false
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: false,
          screw_ie8: true
        }
      })
    ),

    process.env.BUNDLE_ANALYZER_REPORT && ifProduction(new BundleAnalyzerPlugin()),

    new ExtractTextPlugin({
      filename: ifProduction('static/css/bundle.[name].[contenthash:8].css', 'bundle.[name].css'),
      disable: ifNotProduction()
    }),

    // remove duplicate css
    ifProduction(
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ),

    new HtmlWebpackPlugin({
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      template: './index.html',
      inject: true,
      minify: ifProduction({
        removeComments: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      })
    }),

    process.env.BROWSER_SYNC && ifNotProduction(
      new BrowserSyncPlugin({
        open: false,
        port: process.env.BROWSER_SYNC_PORT,
        proxy: externalPath
      }, {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      })
    ),

    new ProgressBarPlugin()
  ])
}
