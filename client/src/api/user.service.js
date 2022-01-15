import axios from 'axios';
import getAuthHeader from './authHeader.js';

const instance = axios.create({
  baseURL: `/api/users`,
});

const singup = async (data) => await instance.post(`/singup`, data);
const login = async (data) => await instance.post(`/login`, data);

const tokenVerification = async () =>
  await instance.get(`/auth`, {
    headers: getAuthHeader(),
  });

const updateOne = async (userId, data) =>
  await instance.put(`/${userId}`, data, {
    headers: getAuthHeader(),
  });

export default {
  singup,
  login,
  tokenVerification,
  updateOne,
};
