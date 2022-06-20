import { Box, Button, Group, Space, Text } from '@mantine/core'
import React from 'react'
import { useDispatch } from 'react-redux'
import { updateCharacter } from './characterSlice'

function CharacterVisibilityForm({ character, setOpened }) {
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    setOpened(false)
    dispatch(
      updateCharacter({
        ...character,
        visible: true,
      })
    )
  }
  return (
    <>
      <Text size="sm" align="center">
        This will allow other players of{' '}
        <strong>{character.campaign.name}</strong> to see this character&#39;s
        profile
      </Text>
      <Text size="sm" align="center">
        Do you still want this character to be visible?
      </Text>
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
