import cameraRepository from '../repositories/camera.repository.js';

const getAll = async ({ userId, logger }) => {
  logger.info(`cameraController getAll userId: ${userId}`);
  return await cameraRepository.getAll({ userId, logger });
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
  const camera = await cameraRepository.getOne({ userId, cameraId });

  if (!camera) {
    throw new Error('camera not found');
  }

  await cameraRepository.updateOne({ userId, cameraId, payload });

  return await cameraRepository.getOne({ userId, cameraId });
};

const deleteOne = async ({ userId, cameraId }) => {
  // console.log('- camera controller deleteOne -', { userId, cameraId });
  const camera = await cameraRepository.getOne({ userId, cameraId });

  if (!camera) {
    throw new Error('camera not found');
  }

  return await cameraRepository.deleteOne({ userId, cameraId });
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
