import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  status: 'idle',
  errors: null,
}

const campaignUserSlice = createSlice({
  name: 'campaignUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default campaignUserSlice.reducer
