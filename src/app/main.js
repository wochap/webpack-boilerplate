import '<styles>/main.scss'

export function sum (a, b) {
  return a + b
}

// This tells Webpack that this file and all of its dependencies can be replaced.
// http://andrewhfarmer.com/webpack-hmr-tutorial/#the-simple-way
if (module.hot) {
  module.hot.accept() // eslint-disable-line
}
