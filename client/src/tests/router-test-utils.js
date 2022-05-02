import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render as rtlRender } from '@testing-library/react'

function render(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route)
  function Wrapper({ children }) {
    return <BrowserRouter>{children}</BrowserRouter>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
