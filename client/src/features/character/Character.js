import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useParams } from 'react-router-dom'
import NotAuthorized from '../error/NotAuthorized'
import NotFound from '../error/NotFound'
import CharacterHeader from './CharacterHeader'
import CharacterOverview from './CharacterOverview'
import { getCharacter } from './characterSlice'

function Character() {
  const { character, status, errors } = useSelector((state) => state.character)
  const { campaign_id, character_id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (character?.id !== character_id) {
      dispatch(getCharacter({ campaign_id, character_id }))
    }
  }, [])

  function renderErrorPage() {
    if (status === 'failed') {
      if (/not authorized/i.test(errors[0])) {
        return <NotAuthorized />
      }
      return <NotFound errors={errors} />
    } else {
      return <div></div>
    }
  }

  return character ? (
    <Routes>
      <Route path="/" element={<CharacterHeader character={character} />}>
        <Route index element={<CharacterOverview character={character} />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    renderErrorPage()
  )
}

export default Character
