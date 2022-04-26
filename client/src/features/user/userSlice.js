import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUser } from './userAPI';

export const userAsync = createAsyncThunk('user/fetchUser', async () => {
  const response = await fetchUser();
  return response.data;
});

const initialState = {
  user: {},
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(userAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
