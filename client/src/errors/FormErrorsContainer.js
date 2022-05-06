import React from 'react'
import { List, ThemeIcon } from '@mantine/core'
import { AlertCircle } from 'tabler-icons-react'
import FormError from './FormError'

function FormErrorsContainer({ errors }) {
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
        ? errors.map((error) => <FormError key={error} error={error} />)
        : null}
    </List>
  )
}

export default FormErrorsContainer
