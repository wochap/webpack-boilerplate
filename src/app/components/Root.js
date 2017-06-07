// @flow

import React from 'react'

export default function Root (
  {message = 'Hello world'}: {message: string}
) {
  return <h1>{message}</h1>
}
