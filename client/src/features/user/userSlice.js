import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMe } from './userAPI';

export const getUser = createAsyncThunk(
  'user/getUser',
  // eslint-disable-next-line no-unused-vars
  async (_, { rejectWithValue }) => {
    const response = await fetchMe();
    const body = await response.json();
    if (response.ok) {
      return body;
    }
    return rejectWithValue(body);
  }
);

const initialState = {
  user: {},
  status: 'idle',
  errors: null,
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
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.errors = action.payload;
      });
  },
});

export default userSlice.reducer;
