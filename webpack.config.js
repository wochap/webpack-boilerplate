require('dotenv-extended').load({
  errorOnMissing: true
})

const {resolve} = require('path')
const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
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
    alias: {
      '<src>': resolve(__dirname, 'src'),
      '<app>': resolve(__dirname, 'src/app'),
      '<styles>': resolve(__dirname, 'src/styles'),
      '<lib>': resolve(__dirname, 'lib')
    },
  },
  output: {
    publicPath: ifDevelopment(externalPath, '/'),
    filename: ifProduction('static/js/bundle.[name].[contenthash:8].js', 'bundle.[name].js'),
    chunkFilename: ifProduction('static/js/chunk.[name].[contenthash:8].js', 'chunk.[name].js'),
    path: resolve(__dirname, 'dist')
  },
  optimization: {
    // extract manifest
    runtimeChunk: {
      name: 'webpackManifest'
    },
    splitChunks: {
      cacheGroups: {
        // any required modules inside node_modules are extracted to vendor
        vendor: {
          test({resource}) {
            return resource &&
              /\.js$/.test(resource) &&
              resource.indexOf(rootNodeModulesPath) === 0
          },
          chunks: 'initial',
          name: 'vendor',
          priority: 9,
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
        test: /\.css$/,
        use: ifProduction(
          [MiniCssExtractPlugin.loader, ...generateStyleLoaders('css-loader', 'postcss-loader')],
          ['style-loader', ...generateStyleLoaders('css-loader', 'postcss-loader')]
        ),
      }, {
        test: /\.scss$/,
        use: ifProduction(
          [MiniCssExtractPlugin.loader, ...generateStyleLoaders('css-loader', 'postcss-loader', 'sass-loader')],
          ['style-loader', ...generateStyleLoaders('css-loader', 'postcss-loader', 'sass-loader')]
        )
      }, {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: ifProduction('static/img/[name].[contenthash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
          name: ifProduction('static/img/[name].[contenthash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.eot(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/vnd.ms-fontobject',
          name: ifProduction('static/fonts/[name].[contenthash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.otf(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'font/opentype',
          name: ifProduction('static/fonts/[name].[contenthash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
          name: ifProduction('static/fonts/[name].[contenthash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.woff(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
          name: ifProduction('static/fonts/[name].[contenthash:8].[ext]', '[name].[ext]')
        }
      }, {
        test: /\.woff2(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff2',
          name: ifProduction('static/fonts/[name].[contenthash:8].[ext]', '[name].[ext]')
        }
      }
    ]
  },
  plugins: removeEmpty([


    // ensures npm install <library> forces a project rebuild
    ifDevelopment(new WatchMissingNodeModulesPlugin(rootNodeModulesPath)),

    // enable HMR globally
    ifDevelopment(new webpack.HotModuleReplacementPlugin()),

    process.env.BUNDLE_ANALYZER_REPORT && ifProduction(new BundleAnalyzerPlugin()),

    ifProduction(
      new MiniCssExtractPlugin({
        filename: ifProduction('static/css/bundle.[name].[contenthash:8].css', 'bundle.[name].css'),
        chunkFilename: ifProduction('static/css/chunk.[name].[contenthash:8].css', 'bundle.[name].css')
      })
    ),

    new HtmlWebpackPlugin({
      template: './index.html',
      minify: ifProduction({
        removeComments: true,
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      })
    }),

    ifProduction(
      new InlineManifestWebpackPlugin('webpackManifest')
    ),

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
