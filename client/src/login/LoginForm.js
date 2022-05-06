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
import { AlertCircle } from 'tabler-icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, reset } from '../user/state/userActions'
import { Link } from 'react-router-dom'

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const dispatch = useDispatch()
  const { status, errors } = useSelector((state) => state.user)

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
    dispatch(loginUser(formData))
    if (status === 'successful') {
      setFormData({
        username: '',
        password: '',
      })
    }
  }

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form style={{ position: 'relative' }} onSubmit={handleSubmit}>
        <LoadingOverlay visible={status === 'loading'} />
        <TextInput
          required
          autoComplete="username"
          label="Username"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={formData.username}
        />
        <PasswordInput
          required
          autoComplete="current-password"
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
            Sign in
          </Button>
        </Group>
        <Link to="/signup" onClick={() => dispatch(reset())}>
          Create new account
        </Link>
      </form>
    </Box>
  )
}

export default LoginForm
