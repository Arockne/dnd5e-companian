import { Stack, Title } from '@mantine/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCharacters } from './characterSlice'
import CharactersTable from './CharactersTable'

function CharactersContainer() {
  const { characters } = useSelector((state) => state.character)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCharacters())
  }, [])

  return (
    <Stack align="center">
      <Title order={2}>Characters</Title>
      <CharactersTable characters={characters} />
    </Stack>
  )
}

export default CharactersContainer
