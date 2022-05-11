import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../../api/client'

export const getCurrentUser = createAsyncThunk(
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

export const createUser = createAsyncThunk(
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

export const loginUser = createAsyncThunk(
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

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  const response = await client.delete(`/api/logout`)
  if (response.ok) {
    return null
  }
})

const initialState = {
  user: null,
  status: 'idle',
  errors: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => ({ ...initialState, authenticated: true }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = 'failed'
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createUser.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload
      })
  },
})

export const { reset } = userSlice.actions

export default userSlice.reducer
