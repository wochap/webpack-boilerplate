// favicon to keep your browser from throwing a 404 during dev
import 'src/favicon.ico'

import 'src/styles/main.scss'

// This tells Webpack that this file and all of its dependencies can be replaced.
// http://andrewhfarmer.com/webpack-hmr-tutorial/#the-simple-way
if (module.hot) {
  module.hot.accept()
}
