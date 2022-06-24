import { render, screen, waitFor } from '../../../utils/test-utils'
import { handlers } from '../../../__mocks__/character'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import CharactersContainer from '../CharactersContainer'

class ResizeObserver {
  observe() {}
  unobserve() {}
}

const server = setupServer(...handlers)

// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())

it('shows users characters', async () => {
  window.ResizeObserver = ResizeObserver
  render(<CharactersContainer />)
  expect(await screen.getByRole('heading', { name: /characters/i }))
  await waitFor(() => screen.getByText(/rocko/i))
})
