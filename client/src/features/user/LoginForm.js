import React, { useEffect, useState } from 'react'
import {
  TextInput,
  Button,
  Box,
  PasswordInput,
  LoadingOverlay,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './userSlice'

function LoginForm() {
  const [visible, setVisible] = useState(false)
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const dispatch = useDispatch()
  const { status, errors } = useSelector((state) => state.user)

  useEffect(() => {
    if (status === 'loading') {
      setVisible(true)
    } else if (status === 'failed') {
      setVisible(false)
      errors.map((error) => form.setFieldError('password', error))
    }
  }, [status])

  const disabled = Object.entries(form.values).every(
    ([_, value]) => value.length > 0
  )

  return (
    <Box>
      <form
        style={{ position: 'relative' }}
        onSubmit={form.onSubmit((values) => dispatch(loginUser(values)))}
      >
        <LoadingOverlay visible={visible} />
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
