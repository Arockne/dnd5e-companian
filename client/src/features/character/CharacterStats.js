import { Stack, Text, Title } from '@mantine/core'
import React from 'react'

function CharacterStats({ character }) {
  return (
    <Stack align="flex-start" spacing={0}>
      <Text size="xs">Str: {character?.strength}</Text>
      <Text size="xs">Dex: {character?.dexterity}</Text>
      <Text size="xs">Con: {character?.constitution}</Text>
      <Text size="xs">Int: {character?.intelligence}</Text>
      <Text size="xs">Wis: {character?.wisdom}</Text>
      <Text size="xs">Cha: {character?.charisma}</Text>
    </Stack>
  )
}

export default CharacterStats
