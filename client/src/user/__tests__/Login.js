import userEvent from '@testing-library/user-event'
import { screen, render, waitFor } from '../../tests/test-utils'
import Login from '../Login'
import { handlers } from '../../__mocks__/user'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

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

// test('when switching between login and signup, errors should not exist from the previous component mount', async () => {
//   const userInput = { username: 'a', email: 'b', password: 'c' }
//   const loginError = {
//     errors: ['Invalid username or password'],
//   }
//   const signupErrors = {
//     errors: [
//       'Username must be greater than 3 characters',
//       'Email must be valid',
//       'Password must be 8 characters long',
//     ],
//   }

//   server.use(
//     rest.post('/api/login', (req, res, ctx) => {
//       return res(ctx.json(loginError), ctx.status(401))
//     })
//   )

//   render(<Login />)

//   const username = screen.getByLabelText(/username/i)
//   const password = screen.getByLabelText(/password/i)
//   const submit = screen.getByRole('button', /sign/i)

//   await userEvent.type(username, userInput.username)
//   userEvent.type(password, userInput.password)
//   userEvent.click(submit)
//   await waitFor(() => expect(screen.getByText(/invalid/i)))
//   expect(screen.getByText(/invalid/i)).toBeInTheDocument()

//   userEvent.click(screen.getByText(/create/i))
//   expect(screen.getByText(/invalid/i)).not.toBeInTheDocument()

//   // server.use(
//   //   rest.post('/api/signup', (req, res, ctx) => {
//   //     return res(ctx.json(signupErrors), ctx.status(422))
//   //   })
//   // )

//   // userEvent.type(screen.getByLabelText(/username/i), userInput.username)
//   // userEvent.type(screen.getByLabelText(/email/i), userInput.email)
//   // userEvent.type(screen.getByLabelText(/password/i), userInput.password)
//   // userEvent.click(screen.getByText(/create/i))

//   // await waitFor(() => {
//   //   expect(screen.getByText(/username must be/i)).toBeInTheDocument()
//   //   expect(screen.getByText(/email must be/i)).toBeInTheDocument()
//   //   expect(screen.getByText(/password must be/i)).toBeInTheDocument()
//   // })

//   // userEvent.click(screen.getByText(/sign/i))
//   // expect(screen.getByText(/username must be/i)).not.toBeInTheDocument()
//   // expect(screen.getByText(/email must be/i)).not.toBeInTheDocument()
//   // expect(screen.getByText(/password must be/i)).not.toBeInTheDocument()
// })
