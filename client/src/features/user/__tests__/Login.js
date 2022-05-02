import userEvent from '@testing-library/user-event'
import { screen, render } from '../../../tests/router-test-utils'
import Login from './Login'

test('login initially renders login form and I can navigate between login and signup', () => {
  render(<Login />)
  expect(screen.getByRole('heading')).toHaveTextContent(/welcome/i)
  userEvent.click(screen.getByText(/create/i))
  expect(screen.getByText(/sign/i)).toBeInDocument()
  userEvent.click(screen.getByText(/sign/i))
  expect(screen.getByText(/create/i)).toBeInDocument()
})
