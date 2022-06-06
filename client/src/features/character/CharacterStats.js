import { Stack, Text, Title } from '@mantine/core'
import React from 'react'

function CharacterStats({ character }) {
  return (
    <Stack spacing={0}>
      <Text size="xs">Strength: {character?.strength}</Text>
      <Text size="xs">Dexterity: {character?.dexterity}</Text>
      <Text size="xs">Constitution: {character?.constitution}</Text>
      <Text size="xs">Intelligence: {character?.intelligence}</Text>
      <Text size="xs">Wisdom: {character?.wisdom}</Text>
      <Text size="xs">Charisma: {character?.charisma}</Text>
    </Stack>
  )
}

export default CharacterStats
