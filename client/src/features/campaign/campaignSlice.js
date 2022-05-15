import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const getCampaigns = createAsyncThunk(
  'campaign/getCampaigns',
  async (_, { rejectWithValue }) => {
    const response = await client.get('/api/campaigns')
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

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
