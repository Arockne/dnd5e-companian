import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useParams } from 'react-router-dom'
import CharacterHeader from './CharacterHeader'
import { getCharacter } from './characterSlice'

function Character() {
  const { character } = useSelector((state) => state.character)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (character?.id !== id) {
      dispatch(getCharacter(id))
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<CharacterHeader character={character} />} />
    </Routes>
  )
}

export default Character
