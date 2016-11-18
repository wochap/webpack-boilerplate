// favicon to keep your browser from throwing a 404 during dev
import 'src/favicon.ico'

import 'src/styles/main.scss'

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader' // eslint-disable-line
import App from './App'

const rootEl = document.getElementById('root')

render((
  <AppContainer>
    <App />
  </AppContainer>),
  rootEl,
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default // eslint-disable-line

    render((
      <AppContainer>
        <NextApp />
      </AppContainer>),
      rootEl,
    )
  })
}
