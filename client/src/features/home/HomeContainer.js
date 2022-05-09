import React from 'react'
import { useSelector } from 'react-redux'
import { MAINHEADERLINKS } from '../../constants'
import MainHeader from '../navigation/Header'

function HomeContainer() {
  const { user } = useSelector((state) => state.user)

  return (
    <div>
      <MainHeader links={MAINHEADERLINKS} />
      <p>{`Welcome ${user.username}`}</p>
    </div>
  )
}

export default HomeContainer
