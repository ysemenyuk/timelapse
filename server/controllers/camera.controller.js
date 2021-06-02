import Camera from '../models/camera.js';
import File from '../models/file.js';
import cameraActions from '../actions/camera.actions.js';

import { getDirsPaths, getDirsNames } from '../utils/camera.utils.js';
import { makeDir, writeFile, removeDir } from '../services/fileService.js';

// console.log('cameraController');

const getAll = async ({ userId }) => {
  // console.log('- camera controller getAll -', { userId });
  return await cameraActions.getAll({ userId });
};

const getOne = async ({ userId, cameraId }) => {
  // console.log('- camera controller getOne -', { userId, cameraId });
  return await cameraActions.getOne({ userId, cameraId });
};

const createOne = async ({ userId, payload }) => {
  // console.log('- camera controller createOne -', { userId, payload });
  return await cameraActions.createOne({ userId, payload });
};

const updateOne = async ({ userId, cameraId, payload }) => {
  // console.log('- camera controller updateOne -', { userId, cameraId, payload });
  return await cameraActions.updateOne({ userId, cameraId, payload });
};

const deleteOne = async ({ userId, cameraId }) => {
  // console.log('- camera controller deleteOne -', { userId, cameraId });
  return await cameraActions.deleteOne({ userId, cameraId });
};

export default { getAll, createOne, getOne, updateOne, deleteOne };
