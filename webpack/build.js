// webpack prod build

process.env.NODE_ENV = 'production'

import webpack from 'webpack'
import ora from 'ora'

import prodWebpackConfig from './webpack.conf.prod.babel'

let spinner = ora('Building for production...')

spinner.start()

webpack(prodWebpackConfig).run((err, stats) => {
  spinner.stop()

  if (err) throw err

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
