import { client } from './client'
import { createAsyncThunk } from '@reduxjs/toolkit'

const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (_, { rejectWithValue }) => {
    const response = await client.get('/api/me')
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

const createUser = createAsyncThunk(
  'user/createUser',
  async (user, { rejectWithValue }) => {
    const response = await client.post('/api/signup', { user: user })
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, { rejectWithValue }) => {
    const response = await client.post('/api/login', user)
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    const response = await client.delete(`/api/logout`)
    const body = await response.json()
    if (response.ok) {
      return {}
    }
    return rejectWithValue(body)
  }
)

export { getCurrentUser, createUser, loginUser, logoutUser }
