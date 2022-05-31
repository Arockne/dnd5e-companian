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
  extraReducers: (builder) => {},
})

export default characterSlice.reducer
