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
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, reset } from '../user/state/userActions'
import { Link } from 'react-router-dom'

function SignUpForm() {
  const [visible, setVisible] = useState(false)
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const { status, errors } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const enabled = Object.entries(form.values).every(
    ([_, value]) => value.length > 0
  )

  useEffect(() => {
    if (status === 'failed') {
      setVisible(false)
      form.setErrors(errors)
    }
    if (status === 'loading') {
      setVisible(true)
      form.clearErrors()
    }
    return () => {
      dispatch(reset())
    }
  }, [status])

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => dispatch(createUser(values)))}
        style={{ position: 'relative' }}
      >
        <LoadingOverlay visible={visible} />
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
          autoComplete="off"
          label="Password"
          placeholder="password"
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
            Create account
          </Button>
        </Group>
        <Link to="/">Sign In</Link>
      </form>
    </Box>
  )
}

export default SignUpForm
