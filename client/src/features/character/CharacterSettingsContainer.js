import React from 'react'
import { useSelector } from 'react-redux'
import CharacterDeleteContainer from './CharacterDeleteContainer'

function CharacterSettingsContainer() {
  const { character } = useSelector((state) => state.character)
  return (
    <>
      <CharacterDeleteContainer character={character} />
    </>
  )
}

export default CharacterSettingsContainer
