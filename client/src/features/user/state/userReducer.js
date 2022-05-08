import { createSlice } from '@reduxjs/toolkit'
import * as userApi from '../../../api/userApi'

const initialState = {
  user: null,
  status: 'idle',
  errors: null,
  authenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => ({ ...initialState, authenticated: true }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(userApi.getCurrentUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(userApi.getCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.authenticated = true
      })
      .addCase(userApi.getCurrentUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
        state.authenticated = true
      })
      .addCase(userApi.createUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(userApi.createUser.fulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addCase(userApi.createUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
      .addCase(userApi.loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(userApi.loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(userApi.loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
      .addCase(userApi.logoutUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(userApi.logoutUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(userApi.logoutUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.payload.errors
      })
  },
})

export default userSlice
