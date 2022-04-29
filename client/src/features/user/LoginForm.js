import React from 'react'
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  PasswordInput,
} from '@mantine/core'

function LoginForm() {
  return (
    <Box>
      <form>
        <TextInput required label="Username" placeholder="Username" />
        <PasswordInput required label="Password" placeholder="Password" />
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  )
}

export default LoginForm
