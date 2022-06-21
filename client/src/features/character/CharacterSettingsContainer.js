import React from 'react'
import { useSelector } from 'react-redux'

function CharacterSettingsContainer() {
  const { character } = useSelector((state) => state.character)
  return <></>
}

export default CharacterSettingsContainer
