// webpack prod build

process.env.NODE_ENV = 'production'

import webpack from 'webpack'
import ora from 'ora'
import path from 'path'
import {rm, mkdir} from 'shelljs'

import {projectRootPath} from './config'
import prodWebpackConfig from './webpack/config.prod.babel'

let spinner = ora('Building for production...')

spinner.start()

const distFolderPath = path.join(projectRootPath, 'dist')
rm('-rf', distFolderPath)
mkdir('-p', distFolderPath)

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
