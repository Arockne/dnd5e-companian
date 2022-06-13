import { Group, Loader, Stack, Title } from '@mantine/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../common/Loading'
import { getCharacters } from './characterSlice'
import CharactersTable from './CharactersTable'

function CharactersContainer() {
  const { characters, status } = useSelector((state) => state.character)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCharacters())
  }, [])

  return (
    <Stack align="center">
      <Title order={2}>Characters</Title>
      {status !== 'loading' ? (
        <CharactersTable characters={characters} />
      ) : (
        <Loading />
      )}
    </Stack>
  )
}

export default CharactersContainer
