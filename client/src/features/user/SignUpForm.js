import { Box, Button, PasswordInput, TextInput } from '@mantine/core'
import React from 'react'

function SignUpForm() {
  return (
    <Box>
      <form>
        <TextInput required label="Username" placeholder="Username" />
        <TextInput required label="Email" placeholder="user@example.com" />
        <PasswordInput required label="Password" placeholder="password" />
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  )
}

export default SignUpForm
