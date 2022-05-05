import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/state/userReducer'

export const store = configureStore({
  reducer: {
    user: userReducer.reducer,
  },
})
