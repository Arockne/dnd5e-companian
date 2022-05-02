import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './loginForm'
import SignUpForm from './SignUpForm'

function Login() {
  return (
    <>
      <h1>Welcome to dnd 5e companion</h1>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </>
  )
}

export default Login
