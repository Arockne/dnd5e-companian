import userEvent from '@testing-library/user-event'
import { screen, render, waitFor } from '../../../tests/test-utils'

it('renders form for user to create an account', () => {
  screen.getByLabelText(/username/i)
  screen.getByLabelText(/email/i)
  screen.getByLabelText(/email confirmation/i)
  screen.getByLabelText(/password/i)
  screen.getByLabelText(/password confirmation/i)
  screen.getByRole('button', /submit/i)
})

it('keeps button disabled until all fields are filled out', async () => {
  const newUser = {
    username: 'testUser',
    email: 'test@email.com',
    email_confirmation: 'test@email.com',
    password: 'testPassword',
    password_confirmation: 'testPassword',
  }
  const username = screen.getByLabelText(/username/i)
  const email = screen.getByLabelText(/email/i)
  const emailCon = screen.getByLabelText(/email confirmation/i)
  const password = screen.getByLabelText(/password/i)
  const passwordCon = screen.getByLabelText(/password confirmation/i)
  const submitButton = screen.getByRole('button', /submit/i)

  await userEvent.type(username, newUser.username)
  expect(submitButton).toBeDisabled()

  await userEvent.type(email, newUser.email)
  expect(submitButton).toBeDisabled()

  await userEvent.type(emailCon, newUser.email_confirmation)
  expect(submitButton).toBeDisabled()

  await userEvent.type(password, newUser.password)
  expect(submitButton).toBeDisabled()

  await userEvent.type(passwordCon, newUser.password_confirmation)
  expect(submitButton).toBeEnabled()
})
