import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default userSlice.reducer;
