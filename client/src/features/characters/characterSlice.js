import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
