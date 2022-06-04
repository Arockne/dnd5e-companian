import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useParams } from 'react-router-dom'
import CharacterHeader from './CharacterHeader'
import CharacterOverview from './CharacterOverview'
import { getCharacter } from './characterSlice'

function Character() {
  const { character } = useSelector((state) => state.character)
  const { campaign_id, character_id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (character?.id !== character_id) {
      dispatch(getCharacter({ campaign_id, character_id }))
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<CharacterHeader character={character} />}>
        <Route index element={<CharacterOverview character={character} />} />
      </Route>
    </Routes>
  )
}

export default Character
