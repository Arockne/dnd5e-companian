import { configureStore } from '@reduxjs/toolkit'
import campaignReducer from './features/campaign/campaignSlice'
import userReducer from './features/user/state/userSlice'
import campaignUserReducer from './features/campaign-user/campaignUserSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    campaign: campaignReducer,
    campaignUser: campaignUserReducer,
  },
})
