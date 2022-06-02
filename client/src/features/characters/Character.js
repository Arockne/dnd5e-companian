import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CharacterHeader from './CharacterHeader'

function Character() {
  return (
    <Routes>
      <Route path="/" element={<CharacterHeader />} />
    </Routes>
  )
}

export default Character
