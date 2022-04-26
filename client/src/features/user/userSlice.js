import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMe } from './userAPI';

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await fetchMe();
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
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
