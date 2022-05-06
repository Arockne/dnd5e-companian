import React from 'react'
import { List, ThemeIcon } from '@mantine/core'
import { AlertCircle } from 'tabler-icons-react'

function ErrorsContainer({ errors }) {
  return (
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
  )
}

export default ErrorsContainer
