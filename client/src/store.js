import { configureStore } from '@reduxjs/toolkit'
import campaignReducer from './features/campaign/campaignSlice'
import userReducer from './features/user/state/userSlice'
import campaignUserReducer from './features/campaign-user/campaignUserSlice'
import campaignSearchReducer from './features/campaign-search/campaignSearchSlice'
import characterReducer from './features/character/characterSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    campaign: campaignReducer,
    campaignSearch: campaignSearchReducer,
    campaignUser: campaignUserReducer,
    character: characterReducer,
  },
})
