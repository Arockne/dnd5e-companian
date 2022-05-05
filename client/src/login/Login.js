import { Title } from '@mantine/core'
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function Login() {
  return (
    <>
      <Title order={1}>Welcome to dnd 5e companion</Title>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default Login
