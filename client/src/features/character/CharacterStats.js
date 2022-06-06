import { Stack, Text, Title } from '@mantine/core'
import React from 'react'

function CharacterStats({ character }) {
  return (
    <Stack align="flex-start">
      <Title order={6}>Strength: {character?.strength}</Title>
      <Title order={6}>Dexterity: {character?.dexterity}</Title>
      <Title order={6}>Constitution: {character?.constitution}</Title>
      <Title order={6}>intelligence: {character?.intelligence}</Title>
      <Title order={6}>wisdom: {character?.wisdom}</Title>
      <Title order={6}>charisma: {character?.charisma}</Title>
    </Stack>
  )
}

export default CharacterStats
