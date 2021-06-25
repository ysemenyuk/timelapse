import File from '../models/file.js';

const getAll = async ({ userId, cameraId, query, logger }) => {
  logger.info(`cameraFileRepository.getAll cameraId: ${cameraId}`);
  const files = await File.find({ user: userId, camera: cameraId, parent: query.parentId });
  return files;
};

const getOne = async ({ userId, cameraId, logger }) => {
  logger.info(`cameraRepository.getOne cameraId: ${cameraId}`);
  // return await Camera.findOne({ user: userId, _id: cameraId });
};

const createOne = async ({ userId, payload, logger }) => {
  logger.info(`cameraRepository.createOne payload: ${payload}`);
  // const camera = new Camera({ user: userId, ...payload });
  // return await camera.save();
};

const updateOne = async ({ userId, cameraId, payload, logger }) => {
  logger.info(`cameraRepository.updateOne cameraId: ${cameraId}, payload: ${payload}`);
  // return await Camera.updateOne({ user: userId, _id: cameraId }, payload);
};

const deleteOne = async ({ userId, cameraId, logger }) => {
  logger.info(`cameraRepository.deleteOne cameraId: ${cameraId}`);
  // const camera = await Camera.findOne({ user: userId, _id: cameraId });
  // return await camera.remove();
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
