import axios from 'axios';

import getAuthHeader from './authHeader.js';

const host = 'http://localhost:3000/';

const instance = axios.create({
  baseURL: `${host}api/cameras`,
  headers: getAuthHeader(),
});

const getAll = async () => await instance.get(`/`);
const getOne = async (id) => await instance.get(`/${id}`);
const createOne = async (data) => await instance.post(`/`, data);
const updateOne = async (id, data) => await instance.put(`/${id}`, data);
const deleteOne = async (id) => await instance.delete(`/${id}`);

const getScreenshot = async (id) => await instance.get(`/${id}/screenshot`);

const getFiles = async (cameraId, parentId) =>
  await instance.get(`/${cameraId}/files?parentId=${parentId}`);

const getTaskScreenshotByTime = async (cameraId) =>
  await instance.get(`/${cameraId}/tasks?type=ScreenshotByTime`);

export default { getAll, getOne, createOne, updateOne, deleteOne, getScreenshot, getFiles };
