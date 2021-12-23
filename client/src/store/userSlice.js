import { createSlice } from '@reduxjs/toolkit';

import userThunks from '../thunks/userThunks.js';

const { singup, login, tokenVerification, uploadAvatar, deleteAvatar, updateOne } = userThunks;

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const initialState =
  userInfo && userInfo.userId && userInfo.token
    ? { tokenVerification: true, isLoggedIn: false, user: null }
    : { tokenVerification: false, isLoggedIn: false, user: null };

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
    [singup.fulfilled]: (state, action) => {
      const userInfo = {
        userId: action.payload.user._id,
        token: action.payload.token,
      };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.fulfilled]: (state, action) => {
      // const userInfo = {
      //   userId: action.payload.user._id,
      //   token: action.payload.token,
      // };

      // localStorage.setItem('userInfo', JSON.stringify(userInfo));

      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [uploadAvatar.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [deleteAvatar.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [updateOne.fulfilled]: (state, action) => {
      state.user = action.payload.user;
    },
    [tokenVerification.fulfilled]: (state, action) => {
      const userInfo = {
        userId: action.payload.user._id,
        token: action.payload.token,
      };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      state.tokenVerification = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [tokenVerification.rejected]: (state, action) => {
      localStorage.removeItem('userInfo');

      state.tokenVerification = false;
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
