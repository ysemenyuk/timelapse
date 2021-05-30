import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import apiRoutes from '../apiRoutes.js';
import getAuthHeader from './authHeader.js';

const singup = createAsyncThunk('user/singup', async (values) => {
  try {
    const response = await axios.post(apiRoutes.singupPath(), values);
    console.log('user/singup response.data -', response.data);
    return response.data;
  } catch (e) {
    console.log('user/singup error -', e.response.data);
    throw e.response.data;
  }
});

const login = createAsyncThunk('user/login', async (values) => {
  try {
    const response = await axios.post(apiRoutes.loginPath(), values);
    console.log('user/login response.data -', response.data);
    return response.data;
  } catch (e) {
    console.error('user/login error -', e.response.data);
    throw e.response.data;
  }
});

const auth = createAsyncThunk('user/auth', async () => {
  try {
    const response = await axios.get(apiRoutes.authPath(), {
      headers: getAuthHeader(),
    });
    console.log('user/auth response.data -', response.data);
    return response.data;
  } catch (e) {
    console.log('user/auth error -', e.response.data);
    throw e.response.data;
  }
});

export default { singup, login, auth };