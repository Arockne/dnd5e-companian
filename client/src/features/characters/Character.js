import React from 'react'
import { Route, Routes } from 'react-router-dom'

function Character() {
  return (
    <Routes>
      <Route path="/" element={<h1>This is the character page</h1>} />
    </Routes>
  )
}

export default Character
