import axios from 'axios';

import getAuthHeader from './authHeader.js';

const host = '';
const prefix = 'api';

const instance = axios.create({
  baseURL: `${host}/${prefix}/cameras`,
  headers: getAuthHeader(),
});

const getAll = async () => await instance.get(`/`);
const getOne = async (id) => await instance.get(`/${id}`);
const createOne = async (data) => await instance.post(`/`, data);
const updateOne = async (id, data) => await instance.put(`/${id}`, data);
const deleteOne = async (id) => await instance.delete(`/${id}`);

export default { getAll, getOne, createOne, updateOne, deleteOne };
