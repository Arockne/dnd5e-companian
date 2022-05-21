import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  PasswordInput,
  TextInput,
  LoadingOverlay,
  Group,
} from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, resetErrors } from '../user/state/userSlice'
import { Link } from 'react-router-dom'
import FormErrorsContainer from '../errors/FormErrorsContainer'

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

  useEffect(() => {
    dispatch(resetErrors())
  }, [])

  useEffect(() => {
    if (status === 'successful') {
      setFormData({
        username: '',
        password: '',
      })
    }
  }, [status])

  function handleChange(e) {
    if (status === 'failed') {
      dispatch(resetErrors())
    }
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(loginUser(formData))
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
        <FormErrorsContainer errors={errors} />
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
