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

const update = async (id, data) =>
  await instance.put(`/${id}`, data, {
    headers: getAuthHeader(),
  });

const uploadAvatar = async (data) =>
  await instance.post(`/avatar`, data, {
    headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' },
  });

const deleteAvatar = async () =>
  await instance.delete(`/avatar`, {
    headers: getAuthHeader(),
  });

export default { singup, login, tokenVerification, update, uploadAvatar, deleteAvatar };
