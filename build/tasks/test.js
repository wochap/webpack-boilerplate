process.env.NODE_ENV = 'test'

import jest from 'jest'

const argv = process.argv.slice(2)

// watch unless on CI
if (!process.env.CI) {
  argv.push('--watch')
}

jest.run(argv)
