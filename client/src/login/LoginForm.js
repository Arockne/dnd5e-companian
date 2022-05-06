import React, { useEffect, useState } from 'react'
import {
  List,
  Box,
  Button,
  PasswordInput,
  TextInput,
  LoadingOverlay,
  ThemeIcon,
  Group,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { AlertCircle } from 'tabler-icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, reset } from '../user/state/userActions'
import { Link } from 'react-router-dom'

function LoginForm() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  })

  const dispatch = useDispatch()
  const { status, errors } = useSelector((state) => state.user)

  useEffect(() => {
    if (status === 'failed') {
      form.setErrors(errors)
    }
    if (status === 'loading') {
      form.clearErrors()
    }
    return () => {
      if (status !== 'succeeded') {
        dispatch(reset())
      }
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
        <LoadingOverlay visible={status === 'loading'} />
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
        <List
          withPadding
          size="sm"
          mt="sm"
          icon={
            <ThemeIcon variant="light" color="red" size={20} radius="xl">
              <AlertCircle size={18} />
            </ThemeIcon>
          }
        >
          {form.errors && Array.isArray(form.errors)
            ? form.errors.map((error) => (
                <List.Item key={error} sx={{ color: '#EE4B2B' }}>
                  {error}
                </List.Item>
              ))
            : null}
        </List>
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
