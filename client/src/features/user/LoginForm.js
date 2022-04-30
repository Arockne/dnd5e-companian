import React from 'react'
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'

function LoginForm() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const disabled = Object.entries(form.values).every(
    ([_, value]) => value.length > 0
  )

  return (
    <Box>
      <form>
        <TextInput
          required
          autoComplete="username"
          label="Username"
          placeholder="Username"
          {...form.getInputProps('username')}
        />
        <PasswordInput
          required
          autoComplete="current-password"
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />
        <Button disabled={!disabled} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default LoginForm
