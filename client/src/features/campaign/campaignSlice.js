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

export const getCampaign = createAsyncThunk(
  'campaign/getCampaign',
  async (id, { rejectWithValue }) => {
    const response = await client.get(`/api/campaign/${id}`)
    const body = await response.json()
    if (response.ok) {
      return body
    }
    return rejectWithValue(body)
  }
)

export const createCampaign = createAsyncThunk(
  'campaign/createCampaign',
  async (campaign, { rejectWithValue }) => {
    const response = await client.post(`/api/campaigns/`, campaign)
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
  errors: null,
}

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCampaigns.pending, (state) => {
        state.status = 'loading'
        state.errors = null
      })
      .addCase(getCampaigns.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.campaigns = action.payload
        state.errors = null
      })
      .addCase(getCampaigns.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
      .addCase(getCampaign.pending, (state) => {
        state.status = 'loading'
        state.campaign = null
        state.errors = null
      })
      .addCase(getCampaign.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.campaign = action.payload
        state.errors = null
      })
      .addCase(getCampaign.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
  },
})

export default campaignSlice.reducer
