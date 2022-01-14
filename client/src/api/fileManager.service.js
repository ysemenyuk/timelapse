import axios from 'axios';

import getAuthHeader from './authHeader.js';

const host = 'http://localhost:3000/';

const instance = axios.create({
  baseURL: `${host}api/cameras`,
});

const getFiles = async (cameraId, parentId) =>
  await instance.get(`/${cameraId}/files?parentId=${parentId}`, { headers: getAuthHeader() });

const getOneFile = async (cameraId, fileId) =>
  await instance.get(`/${cameraId}/files/${fileId}`, { headers: getAuthHeader() });

const deleteOneFile = async (cameraId, fileId) =>
  await instance.delete(`/${cameraId}/files/${fileId}`, { headers: getAuthHeader() });

const getFolders = async (cameraId, parentId) =>
  await instance.get(`/${cameraId}/folders?parentId=${parentId}`, { headers: getAuthHeader() });

const getOneFolder = async (cameraId, folderId) =>
  await instance.get(`/${cameraId}/folders/${folderId}`, { headers: getAuthHeader() });

const deleteOneFolder = async (cameraId, folderId) =>
  await instance.delete(`/${cameraId}/folders/${folderId}`, { headers: getAuthHeader() });

export default {
  getFiles,
  getOneFile,
  deleteOneFile,
  getFolders,
  getOneFolder,
  deleteOneFolder,
};
