import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const loggedinSlice = createSlice({
  name: 'loggedin',
  initialState,
  reducers: {
    setLoggedin: (state, action) => action.payload,
  },
});

export const { setLoggedin } = loggedinSlice.actions;

export default loggedinSlice.reducer;
