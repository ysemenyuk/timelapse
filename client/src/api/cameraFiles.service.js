import axios from 'axios';

import getAuthHeader from './authHeader.js';

const host = 'http://localhost:3000/';

const instance = axios.create({
  baseURL: `${host}api/cameras`,
  headers: getAuthHeader(),
});

const getFiles = async (cameraId, parentId) =>
  await instance.get(`/${cameraId}/files?parentId=${parentId}`);

const getOneFile = async (cameraId, fileId) => await instance.get(`/${cameraId}/files/${fileId}`);

const getFolders = async (cameraId, parentId) =>
  await instance.get(`/${cameraId}/folders?parentId=${parentId}`);

const getOneFolder = async (cameraId, folderId) =>
  await instance.get(`/${cameraId}/folders/${folderId}`);

export default {
  getFiles,
  getOneFile,
  getFolders,
  getOneFolder,
};
