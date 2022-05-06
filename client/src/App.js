import React from 'react'
import { useSelector } from 'react-redux'
import HomeContainer from './features/home/HomeContainer'
import Login from './features/login/Login'

function App() {
  const { user } = useSelector((state) => state.user)

  return <div className="App">{user ? <HomeContainer /> : <Login />}</div>
}

export default App
