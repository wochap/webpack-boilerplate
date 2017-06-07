import '../styles/main.scss' // eslint-disable-line

import React from 'react'
import ReactDom from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Root from './components/Root'

const rootEl = document.getElementById('root')

function render (Component, domNode) {
  return ReactDom.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    domNode
  )
}

render(Root, rootEl)

if (module.hot) {
  module.hot.accept('../styles/main.scss')

  module.hot.accept('./components/Root', () => render(Root, rootEl))
}
