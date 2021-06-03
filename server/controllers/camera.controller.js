import cameraRepository from '../repositories/camera.repository.js';

// import { getDirsPaths, getDirsNames } from '../utils/camera.utils.js';
// import { makeDir, writeFile, removeDir } from '../services/fileService.js';

// console.log('cameraController');

const getAll = async ({ userId }) => {
  // console.log('- camera controller getAll -', { userId });
  return await cameraRepository.getAll({ userId });
};

const getOne = async ({ userId, cameraId }) => {
  // console.log('- camera controller getOne -', { userId, cameraId });
  const camera = await cameraRepository.getOne({ userId, cameraId });
  if (!camera) {
    throw new Error('camera not found');
  }
  return camera;
};

const createOne = async ({ userId, payload }) => {
  // console.log('- camera controller createOne -', { userId, payload });
  return await cameraRepository.createOne({ userId, payload });
};

const updateOne = async ({ userId, cameraId, payload }) => {
  // console.log('- camera controller updateOne -', { userId, cameraId, payload });
  return await cameraRepository.updateOne({ userId, cameraId, payload });
};

const deleteOne = async ({ userId, cameraId }) => {
  // console.log('- camera controller deleteOne -', { userId, cameraId });
  return await cameraRepository.deleteOne({ userId, cameraId });
};

export default { getAll, createOne, getOne, updateOne, deleteOne };
