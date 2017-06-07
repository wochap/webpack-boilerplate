import {sum} from '../main'

describe('main.js', () => {
  it('sum', () => {
    expect(sum(1, 2)).toEqual(3)
  })
})
