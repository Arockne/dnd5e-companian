import { Stack, Text, Title, Group } from '@mantine/core'
import React from 'react'
import CharacterStat from './CharacterStat'

function CharacterStats({ character }) {
  return (
    <Group position="center" style={{ maxWidth: '300px' }}>
      <CharacterStat name={'Strength'} stat={character?.strength} />
      <CharacterStat name={'Dexterity'} stat={character?.dexterity} />
      <CharacterStat name={'Constitution'} stat={character?.constitution} />
      <CharacterStat name={'Intelligence'} stat={character?.intelligence} />
      <CharacterStat name={'Wisdom'} stat={character?.wisdom} />
      <CharacterStat name={'Charisma'} stat={character?.charisma} />
    </Group>
  )
}

export default CharacterStats
