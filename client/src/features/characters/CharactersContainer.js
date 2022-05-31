import { Stack, Title } from '@mantine/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCharacters } from './characterSlice'

function CharactersContainer() {
  const { characters } = useSelector((state) => state.character)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCharacters())
  }, [])

  return (
    <Stack align="center">
      <Title order={2}>Characters</Title>
    </Stack>
  )
}

export default CharactersContainer
