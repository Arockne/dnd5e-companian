import React from 'react'
import App from './App'

import { render } from './utils/test-utils'

test('renders learn react link', () => {
  const { getByText } = render(<App />)
})
