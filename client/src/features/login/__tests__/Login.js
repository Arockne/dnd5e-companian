import userEvent from '@testing-library/user-event'
import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '../../../utils/test-utils'
import { handlers } from '../../../__mocks__/user'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import Login from '../Login'

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('login initially renders login form and I can navigate between login and signup', async () => {
  render(<Login />)
  expect(screen.getByRole('heading')).toHaveTextContent(/welcome/i)
  await userEvent.click(screen.getByText(/create/i))
  expect(screen.getByText(/sign/i)).toBeInTheDocument()
  await userEvent.click(screen.getByText(/sign/i))
  expect(screen.getByText(/create/i)).toBeInTheDocument()
})

test('redirect to home when given an address that does not exist', () => {
  render(<Login />, { route: '/some-random-link' })
  expect(screen.getByRole('heading')).toHaveTextContent(/welcome/i)
  expect(screen.getByText(/create/i)).toBeInTheDocument()
})

test('when switching from login to signup, errors should not exist from the previous component', async () => {
  const userInput = { username: 'a', email: 'b', password: 'c' }
  const loginError = {
    errors: ['Invalid username or password'],
  }

  server.use(
    rest.post('/api/login', (req, res, ctx) => {
      return res(ctx.json(loginError), ctx.status(401))
    })
  )

  render(<Login />)

  const loginFormUsername = screen.getByRole('textbox', { name: /username/i })
  const loginFormPassword = screen.getByLabelText(/password \*/i)
  const loginFormSubmit = screen.getByRole('button', /sign/i)

  userEvent.type(loginFormUsername, userInput.username)
  userEvent.type(loginFormPassword, userInput.password)
  userEvent.click(loginFormSubmit)

  await waitFor(() => expect(screen.getByText(/invalid/i)))
  expect(screen.getByText(/invalid/i)).toBeInTheDocument()

  userEvent.click(screen.getByText(/create/i))

  await waitFor(() => {
    expect(screen.queryByText(/invalid/i)).not.toBeInTheDocument()
  })
})

test('when switching from signup to login, errors should not exist from the previous component', async () => {
  const userInput = { username: 'a', email: 'b', password: 'c' }

  const signupErrors = {
    errors: [
      'Username must be greater than 3 characters',
      'Email must be valid',
      'Password must be 8 characters long',
    ],
  }

  server.use(
    rest.post('/api/signup', (req, res, ctx) => {
      return res(ctx.json(signupErrors), ctx.status(401))
    })
  )

  render(<Login />, { route: '/signup' })

  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))

  const signupFormUsername = screen.getByRole('textbox', { name: /username/i })
  const signupFormEmail = screen.getByRole('textbox', { name: /email/i })
  const signupFormPassword = screen.getByLabelText(/password \*/i)
  const signUpFormSubmit = screen.getByRole('button', /create/i)

  await userEvent.type(signupFormUsername, userInput.username)
  await userEvent.type(signupFormEmail, userInput.email)
  await userEvent.type(signupFormPassword, userInput.password)

  expect(signUpFormSubmit).toBeEnabled()

  userEvent.click(signUpFormSubmit)

  await waitFor(() => {
    expect(screen.getByText(/username must be/i)).toBeInTheDocument()
    expect(screen.getByText(/email must be/i)).toBeInTheDocument()
    expect(screen.getByText(/password must be/i)).toBeInTheDocument()
  })

  expect(screen.getByRole('list')).not.toBeEmptyDOMElement()

  await userEvent.click(screen.getByRole('link', { name: /sign in/i }))

  expect(screen.getByRole('list')).toBeEmptyDOMElement()
})
