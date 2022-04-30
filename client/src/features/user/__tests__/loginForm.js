import { screen, render, waitFor } from '../../../tests/test-utils'
import LoginForm from '../loginForm'
import userEvent from '@testing-library/user-event'
import { handlers } from '../../../__mocks__/user'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

it('renders a form with username and password fields', () => {
  render(<LoginForm />)
  screen.getByLabelText(/username/i)
  screen.getByLabelText(/password/i)
  screen.getByText(/submit/i)
})

test('button to be initially disabled and enabled when form is filled out', async () => {
  const testData = { username: 'testusername', password: 'testPassword' }

  render(<LoginForm />)
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', /submit/i)

  expect(submitButton).toBeDisabled()

  await userEvent.type(username, testData.username)
  expect(username).toHaveValue(testData.username)
  expect(submitButton).toBeDisabled()

  await userEvent.type(password, testData.password)
  expect(password).toHaveValue(testData.password)
  expect(submitButton).toBeEnabled()

  await userEvent.clear(username)
  expect(username).toBeEmptyDOMElement()
  expect(submitButton).toBeDisabled()

  await userEvent.clear(password)
  expect(password).toBeEmptyDOMElement()
  expect(submitButton).toBeDisabled()
})

it('handles server error', async () => {
  const testData = { username: 'testfailUser', password: 'testFailPassword' }
  const errorMessage = 'Invalid username or password'
  server.use(
    rest.post('/api/login', (req, res, ctx) => {
      return res(ctx.json({ errors: [errorMessage] }), ctx.status(401))
    })
  )
  render(<LoginForm />)
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', /submit/i)

  expect(username).toBeEmptyDOMElement()
  expect(password).toBeEmptyDOMElement()

  await userEvent.type(username, testData.username)
  await userEvent.type(password, testData.password)

  await userEvent.click(submitButton)

  await waitFor(() => screen.getByText(/invalid/i))
  expect(screen.getByText(/invalid/i)).toBeInTheDocument()
  expect(screen.getByText(/invalid/i)).toHaveTextContent(errorMessage)
})
