import React, { useEffect, useState } from 'react'
import {
  TextInput,
  Button,
  Box,
  PasswordInput,
  LoadingOverlay,
  Group,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './userSlice'
import { Link } from 'react-router-dom'

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

  const enabled = Object.entries(form.values).every(
    ([_, value]) => value.length > 0
  )

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
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
        <Group position="right" mt="md">
          <Button disabled={!enabled} type="submit">
            Sign in
          </Button>
        </Group>
        <Link to="/signup">Create new account</Link>
      </form>
    </Box>
  )
}

export default LoginForm
