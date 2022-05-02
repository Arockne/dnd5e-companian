import userEvent from '@testing-library/user-event'
import { screen, render } from '../../../tests/test-utils'
import Login from '../Login'

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
