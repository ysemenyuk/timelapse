import axios from 'axios';
import getAuthHeader from './authHeader.js';

const host = 'http://localhost:3000';

const instance = axios.create({
  baseURL: `${host}/api/cameras`,
});

const getAll = async () => await instance.get(`/`, { headers: getAuthHeader() });

const getOne = async (id) => await instance.get(`/${id}`, { headers: getAuthHeader() });

const createOne = async (data) => await instance.post(`/`, data, { headers: getAuthHeader() });

const updateOne = async (id, data) =>
  await instance.put(`/${id}`, data, { headers: getAuthHeader() });

const deleteOne = async (id) => await instance.delete(`/${id}`, { headers: getAuthHeader() });

const createScreenshot = async (cameraId) =>
  await instance.post(`/${cameraId}/screenshots`, null, { headers: getAuthHeader() });

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  createScreenshot,
};
