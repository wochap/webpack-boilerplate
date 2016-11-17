import 'src/favicon.ico'
import 'src/styles/main.scss'

// function to test
export default (a, b) => (a + b)

// This tells Webpack that this file and all of its dependencies can be replaced.
// http://andrewhfarmer.com/webpack-hmr-tutorial/#the-simple-way
if (module.hot) {
  module.hot.accept()
}
