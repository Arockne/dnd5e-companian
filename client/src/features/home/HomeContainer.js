import React from 'react'
import { useSelector } from 'react-redux'
import { MAINHEADERLINKS } from '../../constants'
import MainHeader from '../navigation/Header'

function HomeContainer() {
  return (
    <div>
      <MainHeader links={MAINHEADERLINKS} />
      <p>{`Welcome`}</p>
    </div>
  )
}

export default HomeContainer
