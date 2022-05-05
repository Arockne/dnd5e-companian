import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import userReducer from './user/state/userReducer'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer.reducer,
  },
})
