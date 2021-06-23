import axios from 'axios';

import getAuthHeader from './authHeader.js';

const host = 'http://localhost:3000/';

const instance = axios.create({
  baseURL: `${host}api/screenshots`,
  headers: getAuthHeader(),
});

const getOne = async (cameraId) => await instance.get(`/?cameraId=${cameraId}`);

export default { getOne };
