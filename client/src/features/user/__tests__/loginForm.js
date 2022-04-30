import { screen, render } from '@testing-library/react'
import LoginForm from '../loginForm'
import userEvent from '@testing-library/user-event'

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
