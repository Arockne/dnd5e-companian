import React from 'react'
import App from './App'

import { render } from './tests/test-utils'

test('renders learn react link', () => {
  const { getByText } = render(<App />)
})
