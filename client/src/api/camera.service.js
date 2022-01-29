import axios from 'axios';
import getAuthHeader from './authHeader.js';

const host = 'http://localhost:3000';

const instance = axios.create({
  baseURL: `${host}/api/cameras`,
});

const getAll = async () => {
  const response = await instance.get('/', { headers: getAuthHeader() });
  return response;
};

const getOne = async (id) => {
  const response = await instance.get(`/${id}`, { headers: getAuthHeader() });
  return response;
};

const createOne = async (data) => {
  const response = await instance.post('/', data, { headers: getAuthHeader() });
  return response;
};

const updateOne = async (id, data) => {
  const response = await instance.put(`/${id}`, data, { headers: getAuthHeader() });
  return response;
};

const deleteOne = async (id) => {
  const response = await instance.delete(`/${id}`, { headers: getAuthHeader() });
  return response;
};

const createScreenshot = async (cameraId, parentId) => {
  const response = await instance.post(`/${cameraId}/files/screenshot`, { parentId }, { headers: getAuthHeader() });
  return response;
};

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  createScreenshot,
};
