import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const getCharacters = createAsyncThunk(
  'character/getCharacters',
  (_, { rejectWithValue }) => {
    const response = client.get('/api/characters')
    const body = response.json()

    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

const initialState = {
  character: null,
  characters: [],
  status: 'idle',
  errors: null,
}

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.status = 'loading'
        state.errors = null
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.status = 'idle'
        state.characters = action.payload
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
  },
})

export default characterSlice.reducer
