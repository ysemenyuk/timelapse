import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import userRepository from '../api/user.repository.js';

const singup = createAsyncThunk('user/singup', async (values) => {
  try {
    const { data } = await userRepository.singup(values);

    console.log('user/singup response.data -', data);

    return data;
  } catch (e) {
    console.log('user/singup error -', e.response.data);
    throw e.response.data;
  }
});

const login = createAsyncThunk('user/login', async (values) => {
  try {
    const { data } = await userRepository.login(values);

    console.log('user/login response.data -', data);

    return data;
  } catch (e) {
    console.error('user/login error -', e.response.data);
    throw e.response.data;
  }
});

const tokenVerification = createAsyncThunk('user/tokenVerification', async () => {
  try {
    const { data } = await userRepository.tokenVerification();

    console.log('user/tokenVerification response.data -', data);

    return data;
  } catch (e) {
    console.log('user/tokenVerification error -', e.response.data);
    throw e.response.data;
  }
});

export default { singup, login, tokenVerification };
