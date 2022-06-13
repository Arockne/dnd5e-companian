import { Group, Loader } from '@mantine/core'
import React from 'react'

function Loading() {
  return (
    <Group position="center">
      <Loader size="xl" />
    </Group>
  )
}

export default Loading
