import { Box, Button, Group, Space, Text } from '@mantine/core'
import React from 'react'

function CharacterVisibilityForm({ character }) {
  return (
    <>
      <Text size="sm">
        This will allow other players of the campaign to see your character
        profile
      </Text>
      <Text size="sm">Do you still want this character to be visible?</Text>
      <br />
      <Group position="center">
        <Button>Yes</Button>
        <Button>No</Button>
      </Group>
    </>
  )
}

export default CharacterVisibilityForm
