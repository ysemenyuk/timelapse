import cameraRepository from '../repositories/camera.repository.js';

const getAll = async ({ userId, logger }) => {
  logger(`cameraController.getAll`);
  return await cameraRepository.getAll({ userId, logger });
};

const getOne = async ({ userId, cameraId, logger }) => {
  logger(`cameraController.getOne cameraId: ${cameraId}`);
  const camera = await cameraRepository.getOne({ userId, cameraId, logger });

  if (!camera) {
    logger(`cameraController.getOne cameraId: ${cameraId} - not found`);
    throw new Error('camera not found');
  }

  return camera;
};

const createOne = async ({ userId, payload, logger }) => {
  logger(`cameraController.createOne payload: ${payload}`);
  return await cameraRepository.createOne({ userId, payload, logger });
};

const updateOne = async ({ userId, cameraId, payload, logger }) => {
  logger(`cameraController.updateOne cameraId: ${cameraId}, payload: ${payload}`);
  const camera = await cameraRepository.getOne({ userId, cameraId, logger });

  if (!camera) {
    logger(`cameraController.updateOne cameraId: ${cameraId} - not found`);
    throw new Error('camera not found');
  }

  await cameraRepository.updateOne({ userId, cameraId, payload, logger });
  return await cameraRepository.getOne({ userId, cameraId, logger });
};

const deleteOne = async ({ userId, cameraId, logger }) => {
  logger(`cameraController.deleteOne cameraId: ${cameraId}`);
  const camera = await cameraRepository.getOne({ userId, cameraId, logger });

  if (!camera) {
    logger(`cameraController.deleteOne cameraId: ${cameraId} - not found`);
    throw new Error('camera not found');
  }

  return await cameraRepository.deleteOne({ userId, cameraId, logger });
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
