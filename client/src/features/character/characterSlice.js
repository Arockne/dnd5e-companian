import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const getCharacters = createAsyncThunk(
  'character/getCharacters',
  async (_, { rejectWithValue }) => {
    const response = await client.get('/api/characters')
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

export const getCharacter = createAsyncThunk(
  'character/getCharacter',
  async ({ campaign_id, character_id }, { rejectWithValue }) => {
    const response = await client.get(
      `/api/campaigns/${campaign_id}/characters/${character_id}`
    )
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

export const updateCharacter = createAsyncThunk(
  'character/updateCharacter',
  async ({ campaign_id, character }, { rejectWithValue }) => {
    const response = await client.patch(
      `/api/campaigns/${campaign_id}/characters/${character.id}`,
      { character }
    )
    const body = await response.json()
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
      })
      .addCase(getCharacter.pending, (state) => {
        state.status = 'loading'
        state.errors = null
      })
      .addCase(getCharacter.fulfilled, (state, action) => {
        state.status = 'idle'
        state.character = action.payload
      })
      .addCase(getCharacter.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
      .addCase(updateCharacter.pending, (state) => {
        state.status = 'loading'
        state.errors = null
      })
      .addCase(updateCharacter.fulfilled, (state, action) => {
        state.status = 'idle'
        state.character = action.payload
      })
      .addCase(updateCharacter.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
  },
})

export default characterSlice.reducer
