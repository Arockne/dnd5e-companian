import React from 'react'
import { useSelector } from 'react-redux'
import HomeContainer from './home/HomeContainer'
import Login from './login/Login'

function App() {
  const { user } = useSelector((state) => state.user)

  return <div className="App">{user ? <HomeContainer /> : <Login />}</div>
}

export default App
