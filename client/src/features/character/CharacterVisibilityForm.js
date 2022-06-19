import { Box, Button, Group, Space, Text } from '@mantine/core'
import React from 'react'

function CharacterVisibilityForm({ character, setOpened }) {
  function handleSubmit(e) {
    e.preventDefault()
    setOpened(false)
  }
  return (
    <>
      <Text size="sm">
        This will allow other players of{' '}
        <strong>{character.campaign.name}</strong> to see this character&#39;s
        profile
      </Text>
      <Text size="sm">Do you still want this character to be visible?</Text>
      <br />
      <form onSubmit={handleSubmit}>
        <Group position="center">
          <Button type="submit">Yes</Button>
          <Button onClick={() => setOpened(false)}>No</Button>
        </Group>
      </form>
    </>
  )
}

export default CharacterVisibilityForm
