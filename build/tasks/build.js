// run webpack with production config

process.env.NODE_ENV = 'production'

import webpack from 'webpack'
import ora from 'ora'
import path from 'path'
import shelljs from 'shelljs'

import webpackConfigProd from '../webpack/config.prod.babel'
import {projectRootPath, projectPublicPath} from '../config'

let spinner = ora('Building for production...')

spinner.start()

const projectDistPath = path.join(projectRootPath, 'dist')

// delete dist folder
shelljs.rm('-rf', projectDistPath)
shelljs.mkdir('-p', projectDistPath)

// copy public folder to dist folder
shelljs.cp('-R', `${projectPublicPath}/*`, projectDistPath)

webpack(webpackConfigProd).run((err, stats) => {
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
