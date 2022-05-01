import userEvent from '@testing-library/user-event'
import { screen, render, waitFor } from '../../../tests/test-utils'
import SignUpForm from '../SignUpForm'

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
