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
import { AlertCircle } from 'tabler-icons-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, reset } from '../user/state/userActions'
import { Link } from 'react-router-dom'

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const { status, errors } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const enabled = Object.entries(formData).every(
    ([_, value]) => value.length > 0
  )

  function handleChange(e) {
    if (status === 'failed') {
      dispatch(reset())
    }
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(createUser(formData))
    if (status === 'successful') {
      setFormData({
        username: '',
        email: '',
        password: '',
      })
    }
  }

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <LoadingOverlay visible={status === 'loading'} />
        <TextInput
          required
          label="Username"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <TextInput
          required
          label="Email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <PasswordInput
          required
          autoComplete="off"
          label="Password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={formData.password}
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
          {errors
            ? errors.map((error) => (
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
        <Link to="/" onClick={() => dispatch(reset())}>
          Sign In
        </Link>
      </form>
    </Box>
  )
}

export default SignUpForm
