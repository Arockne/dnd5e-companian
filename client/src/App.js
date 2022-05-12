import React, { useEffect } from 'react'
import { Group, Loader } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './features/user/state/userSlice'
import HomeContainer from './features/home/HomeContainer'
import Login from './features/login/Login'

function App() {
  const { user, authenticated } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])

  function unauthorizedUser() {
    if (!authenticated) {
      return <div></div>
    } else {
      return <Login />
    }
  }

  function authorizedUser() {
    return <HomeContainer />
  }

  return (
    <div className="App">{user ? authorizedUser() : unauthorizedUser()}</div>
  )
}

export default App
