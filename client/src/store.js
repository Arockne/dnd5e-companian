import { configureStore } from '@reduxjs/toolkit'
import campaignReducer from './features/campaign/campaignSlice'
import userReducer from './features/user/state/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    campaign: campaignReducer,
  },
})
