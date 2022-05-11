import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/state/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})
