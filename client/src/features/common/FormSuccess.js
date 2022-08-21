import React from 'react'
import { List, ThemeIcon } from '@mantine/core'
import { CircleCheck } from 'tabler-icons-react'

function FormSuccess({ message }) {
  return (
    <List
      withPadding
      size="sm"
      mt="sm"
      icon={
        <ThemeIcon variant="light" color="teal" size={20} radius="xl">
          <CircleCheck size={18} />
        </ThemeIcon>
      }
    >
      <List.Item>{message}</List.Item>
    </List>
  )
}

export default FormSuccess
