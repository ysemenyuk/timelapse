import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import apiRoutes from '../apiRoutes.js';

// console.log('thunks');

const getAuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  // console.log('userInfo', userInfo);

  if (userInfo && userInfo.token) {
    return { Authorization: `Bearer ${userInfo.token}` };
  }

  return {};
};

const registration = createAsyncThunk('user/registration', async (values) => {
  try {
    const response = await axios.post(apiRoutes.registrationPath(), values);
    console.log('user/registration response.data -', response.data);
    return response.data;
  } catch (e) {
    console.log('user/registration error -', e.message);
    throw e;
  }
});

const login = createAsyncThunk('user/login', async (values) => {
  try {
    const response = await axios.post(apiRoutes.loginPath(), values);
    console.log('user/login response.data -', response.data);

    const userInfo = {
      userId: response.data.user._id,
      token: response.data.token,
    };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return response.data;
  } catch (e) {
    console.log('user/login error -', e.message);
    throw e;
  }
});

const auth = createAsyncThunk('user/auth', async () => {
  try {
    const response = await axios.get(apiRoutes.authPath(), {
      headers: getAuthHeader(),
    });

    console.log('user/auth response.data -', response.data);

    const userInfo = {
      userId: response.data.user._id,
      token: response.data.token,
    };

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return response.data;
  } catch (e) {
    console.log('user/auth error -', e.message);
    throw e;
  }
});

export default { registration, login, auth };
