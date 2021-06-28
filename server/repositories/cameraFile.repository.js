import File from '../models/file.js';

const getAll = async ({ userId, cameraId, query, logger }) => {
  logger.info(`cameraFileRepository.getAll cameraId: ${cameraId}`);
  const files = await File.find({ user: userId, camera: cameraId, parent: query.parentId });
  return files;
};

const getOne = async ({ userId, cameraId, fileId, logger }) => {
  logger.info(`cameraFileRepository.getOne fileId: ${fileId}`);
  return await File.findOne({ user: userId, camera: cameraId, _id: fileId });
};

const createOne = async ({ userId, cameraId, name, original, preview, parent, logger }) => {
  logger.info(`cameraFileRepository.createOne fileName: ${name}`);

  const file = new File({
    user: userId,
    camera: cameraId,
    name,
    original,
    preview,
    parent,
  });

  // console.log('cameraFileRepository.getScreenshot file', file);

  file.save();

  return file;
};

const updateOne = async ({ userId, cameraId, payload, logger }) => {
  // logger.info(`cameraFileRepository.updateOne cameraId: ${cameraId}, payload: ${payload}`);
  // return await Camera.updateOne({ user: userId, _id: cameraId }, payload);
};

const deleteOne = async ({ userId, cameraId, fileId, logger }) => {
  logger.info(`cameraFileRepository.deleteOne fileId: ${fileId}`);
  return await File.findOneAndDelete({ user: userId, camera: cameraId, _id: fileId });
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
