import { createSlice } from '@reduxjs/toolkit';

import userThunks from '../thunks/userThunks.js';

const { login, auth } = userThunks;

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLogin: false,
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('userInfo');
      state.isLogin = false;
      state.user = null;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLogin = true;
      state.user = action.payload.user;
    },
    [auth.fulfilled]: (state, action) => {
      state.isLogin = true;
      state.user = action.payload.user;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
