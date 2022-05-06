import userEvent from '@testing-library/user-event'
import { screen, render, waitFor } from '../../../utils/test-utils'
import { handlers } from '../../../__mocks__/user'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import SignUpForm from '../SignUpForm'

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

it('renders form to create an account', () => {
  render(<SignUpForm />)
  screen.getByLabelText(/username/i)
  screen.getByLabelText(/email/i)
  screen.getByLabelText(/password/i)
  screen.getByRole('button', /submit/i)
})

it('keeps button disabled until all fields are filled out', async () => {
  render(<SignUpForm />)
  const newUser = {
    username: 'testUser',
    email: 'test@email.com',
    password: 'testPassword',
  }
  const username = screen.getByLabelText(/username/i)
  const email = screen.getByLabelText(/email/i)
  const password = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', /submit/i)

  await userEvent.type(username, newUser.username)
  expect(username).toHaveValue(newUser.username)
  expect(submitButton).toBeDisabled()

  await userEvent.type(email, newUser.email)
  expect(email).toHaveValue(newUser.email)
  expect(submitButton).toBeDisabled()

  await userEvent.type(password, newUser.password)
  expect(password).toHaveValue(newUser.password)
  expect(submitButton).toBeEnabled()
})

it('handles server errors', async () => {
  const newUser = {
    username: 'Yo',
    email: 'badEmail',
    password: 'testPassword',
  }

  const errorMessages = {
    usernameError: 'Username must have a length greater than 3',
    emailError: 'Email must be valid',
  }
  server.use(
    rest.post('/api/signup', (req, res, ctx) => {
      return res(
        ctx.json({ errors: Object.values(errorMessages) }),
        ctx.status(422)
      )
    })
  )
  render(<SignUpForm />)

  const username = screen.getByLabelText(/username/i)
  const email = screen.getByLabelText(/email/i)
  const password = screen.getByLabelText(/password/i)
  const submitButton = screen.getByRole('button', /submit/i)

  await userEvent.type(username, newUser.username)
  await userEvent.type(email, newUser.email)
  await userEvent.type(password, newUser.password)

  await userEvent.click(submitButton)

  await waitFor(() => screen.getByText(/username must/i))
  expect(screen.getByText(/username must/i)).toHaveTextContent(
    errorMessages.usernameError
  )
  expect(screen.getByText(/email must/i)).toHaveTextContent(
    errorMessages.emailError
  )
})
