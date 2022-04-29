import { screen, render } from '@testing-library/react'
import LoginForm from '../loginForm'

it('renders a form with username and password fields', () => {
  render(<LoginForm />)
  screen.getByLabelText(/username/i)
  screen.getByLabelText(/password/i)
  screen.getByText(/submit/i)
})
