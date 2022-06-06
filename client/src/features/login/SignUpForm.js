import {
  Box,
  Button,
  PasswordInput,
  TextInput,
  LoadingOverlay,
  Group,
} from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, resetErrors } from '../user/state/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import FormErrorsContainer from '../error/FormErrorsContainer'

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const { status, errors } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const enabled = Object.entries(formData).every(
    ([_, value]) => value.length > 0
  )

  useEffect(() => {
    dispatch(resetErrors())
  }, [])

  useEffect(() => {
    if (status === 'succeeded') {
      setFormData({
        username: '',
        email: '',
        password: '',
      })
      navigate('/')
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
    dispatch(createUser(formData))
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
        <FormErrorsContainer errors={errors} />
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
