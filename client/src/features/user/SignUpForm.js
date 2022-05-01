import { Box, Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'

function SignUpForm() {
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
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
          label="Username"
          placeholder="Username"
          {...form.getInputProps('username')}
        />
        <TextInput
          required
          label="Email"
          placeholder="Email"
          {...form.getInputProps('email')}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="password"
          {...form.getInputProps('password')}
        />
        <Button disabled={!disabled} type="submit">
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default SignUpForm
