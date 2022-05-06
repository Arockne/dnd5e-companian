import React from 'react'
import { useSelector } from 'react-redux'

function HomeContainer() {
  const { user } = useSelector((state) => state.user)

  return (
    <div>
      <p>{`Welcome ${user.username}`}</p>
    </div>
  )
}

export default HomeContainer
