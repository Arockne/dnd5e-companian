import userEvent from '@testing-library/user-event'
import { screen, render, waitFor } from '../utils/test-utils'
import App from '../App'
import { handlers } from '../__mocks__/user'
import { setupServer } from 'msw/node'

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

it('renders app', () => {
  render(<App />)
})

test('user is able to login', async () => {
  const testUser = { username: 'test', password: 'testpassword' }

  render(<App />)

  const username = screen.getByRole('textbox', { name: /username/i })
  const password = screen.getByLabelText(/password \*/i)
  const submit = screen.getByRole('button', { name: /sign in/i })

  await userEvent.type(username, testUser.username)
  expect(username).toHaveValue(testUser.username)

  await userEvent.type(password, testUser.password)
  expect(password).toHaveValue(testUser.password)

  await userEvent.click(submit)

  await waitFor(() => {
    expect(screen.getByText(/welcome test/i)).toBeInTheDocument()
  })
})
