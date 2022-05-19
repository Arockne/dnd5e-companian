import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const joinCampaign = createAsyncThunk(
  'campaignUser/joinCampaign',
  async (campaign, { rejectWithValue }) => {
    const response = await client.post(
      `/api/campaigns/${campaign.id}/campaign_users`,
      {
        campaign,
      }
    )
    const body = await response.json()
    if (response.ok) {
      return
    }
    return rejectWithValue(body)
  }
)

const initialState = {
  status: 'idle',
  errors: null,
}

const campaignUserSlice = createSlice({
  name: 'campaignUser',
  initialState,
  reducers: {
    reset: (state) => {
      state.status = 'idle'
      state.errors = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinCampaign.pending, (state) => {
        state.status = 'loading'
        state.errors = null
      })
      .addCase(joinCampaign.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(joinCampaign.rejected, (state, action) => {
        state.status = 'rejected'
        state.errors = action.payload.errors
      })
  },
})

export default campaignUserSlice.reducer
export const { reset } = campaignUserSlice.actions
