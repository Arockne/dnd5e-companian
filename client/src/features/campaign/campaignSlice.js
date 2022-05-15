import { createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  campaign: null,
  campaigns: null,
  status: 'idle',
}

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {},
  extraReducers: () => {},
})

export default campaignSlice.reducer
