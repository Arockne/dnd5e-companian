import React from 'react'
import { List } from '@mantine/core'

function FormError({ error }) {
  return <List.Item sx={{ color: '#EE4B2B' }}>{error}</List.Item>
}

export default FormError
