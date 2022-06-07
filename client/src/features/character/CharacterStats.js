import { Stack, Text, Title } from '@mantine/core'
import React from 'react'
import CharacterStat from './CharacterStat'

function CharacterStats({ character }) {
  return (
    <Stack spacing={0}>
      <CharacterStat name={'Strength'} stat={character?.strength} />
      <CharacterStat name={'Dexterity'} stat={character?.dexterity} />
      <CharacterStat name={'Constitution'} stat={character?.constitution} />
      <CharacterStat name={'Intelligence'} stat={character?.intelligence} />
      <CharacterStat name={'Wisdom'} stat={character?.wisdom} />
      <CharacterStat name={'Charisma'} stat={character?.charisma} />
    </Stack>
  )
}

export default CharacterStats
