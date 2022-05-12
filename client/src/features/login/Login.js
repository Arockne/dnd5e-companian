import { Group, Loader, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function Login() {
  const [pageLoad, setPageLoad] = useState(false)

  useEffect(() => {
    setPageLoad(true)
  }, [])

  return pageLoad ? (
    <>
      <Title order={1} align="center">
        Welcome to D&D 5e Companion
      </Title>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  ) : (
    <Group sx={{ justifyContent: 'center', height: '100vh' }}>
      <Loader size="100" variant="bars" />
    </Group>
  )
}

export default Login
