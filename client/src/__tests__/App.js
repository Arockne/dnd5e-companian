import userEvent from '@testing-library/user-event'
import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '../utils/test-utils'
import App from '../App'
import { handlers } from '../__mocks__/user'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('user is able to login', async () => {
  const testUser = { username: 'test', password: 'testpassword' }

  server.use(
    rest.get('/api/me', (req, res, ctx) => {
      return res(ctx.json({ errors: ['Not authorized'] }), ctx.status(401))
    })
  )

  render(<App />)

  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))

  const username = await screen.getByRole('textbox', { name: /username/i })
  const password = await screen.getByLabelText(/password \*/i)
  const submit = await screen.getByRole('button', { name: /sign in/i })

  await userEvent.type(username, testUser.username)
  expect(username).toHaveValue(testUser.username)

  await userEvent.type(password, testUser.password)
  expect(password).toHaveValue(testUser.password)

  await userEvent.click(submit)

  await waitFor(() => {
    expect(screen.getByText(/test/i)).toBeInTheDocument()
  })
})

test('if already logged in should see home page', async () => {
  render(<App />)

  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))

  expect(screen.getByText(/test/i)).toBeInTheDocument()
})

test('user is able to logout', async () => {
  render(<App />)

  await waitForElementToBeRemoved(() => screen.getByRole('presentation'))

  await userEvent.click(screen.getByRole('button', { name: /test/i }))

  expect(screen.getByRole('menuitem', { name: /logout/i })).toBeInTheDocument()

  await userEvent.click(screen.getByRole('menuitem', { name: /logout/i }))

  await waitFor(() => {
    expect(
      screen.getByRole('textbox', { name: /username/i })
    ).toBeInTheDocument()
  })
})
