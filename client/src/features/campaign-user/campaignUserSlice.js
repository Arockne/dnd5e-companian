import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const joinCampaign = createAsyncThunk(
  'campaignUser/joinCampaign',
  async (campaign, { rejectWithValue }) => {
    const response = await client.post(`/api/campaigns/${campaign.id}`, {
      campaign,
    })
    const data = await response
    if (response.ok) {
      return
    }
    rejectWithValue(data)
  }
)

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
