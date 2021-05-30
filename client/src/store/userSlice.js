import { createSlice } from '@reduxjs/toolkit';

import userThunks from '../thunks/userThunks.js';

const { login, auth } = userThunks;

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const initialState =
  userInfo && userInfo.userId && userInfo.token
    ? { isLoggedIn: 'checkToken', user: null }
    : { isLoggedIn: false, user: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('userInfo');

      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const userInfo = {
        userId: action.payload.user._id,
        token: action.payload.token,
      };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [auth.fulfilled]: (state, action) => {
      const userInfo = {
        userId: action.payload.user._id,
        token: action.payload.token,
      };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [auth.rejected]: (state, action) => {
      localStorage.removeItem('userInfo');

      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
