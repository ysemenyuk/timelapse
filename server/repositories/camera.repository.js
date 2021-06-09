import Camera from '../models/camera.js';

const getAll = async ({ userId, logger }) => {
  logger.info(`cameraRepository.getAll userId: ${userId}`);
  return await Camera.find({ user: userId });
};

const getOne = async ({ userId, cameraId, logger }) => {
  logger.info(`cameraRepository.getOne cameraId: ${cameraId}`);
  return await Camera.findOne({ user: userId, _id: cameraId });
};

const createOne = async ({ userId, payload, logger }) => {
  logger.info(`cameraRepository.createOne payload: ${payload}`);
  const camera = new Camera({ user: userId, ...payload });
  return await camera.save();
};

const updateOne = async ({ userId, cameraId, payload, logger }) => {
  logger.info(`cameraRepository.updateOne cameraId: ${cameraId}, payload: ${payload}`);
  return await Camera.updateOne({ user: userId, _id: cameraId }, payload);
};

const deleteOne = async ({ userId, cameraId, logger }) => {
  logger.info(`cameraRepository.deleteOne cameraId: ${cameraId}`);
  const camera = await Camera.findOne({ user: userId, _id: cameraId });
  return await camera.remove();
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
