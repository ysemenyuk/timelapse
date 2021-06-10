import axios from 'axios';

import getAuthHeader from './authHeader.js';

const instance = axios.create({
  baseURL: `/api/user`,
});

const singup = async (data) => await instance.post(`/singup`, data);
const login = async (data) => await instance.post(`/login`, data);

const tokenVerification = async () =>
  await instance.get(`/auth`, {
    headers: getAuthHeader(),
  });

export default { singup, login, tokenVerification };
