// @flow

import {app} from './app'
import '../styles/main.scss' // eslint-disable-line

app.$mount('#root')

export function sum (a: number, b: number): number {
  return a + b
}

// This tells Webpack that this file and all of its dependencies can be replaced.
// http://andrewhfarmer.com/webpack-hmr-tutorial/#the-simple-way
if (module.hot) {
  module.hot.accept() // eslint-disable-line
}
