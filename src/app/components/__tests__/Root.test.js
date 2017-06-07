import React from 'react'
import renderer from 'react-test-renderer'
import Root from '../Root'

describe('Root', () => {
  it('render custom message', () => {
    const component = renderer.create(<Root message='yeahh' />)

    expect(component).toMatchSnapshot()
  })
})
