import cameraFileRepo from '../repositories/cameraFile.repository.js';

const getAll = async ({ userId, cameraId, query, logger }) => {
  logger(`cameraFileController.getAll cameraId: ${cameraId}`);

  const files = await cameraFileRepo.getAll({ userId, cameraId, query, logger });
  return files;
};

const getOne = async ({ userId, cameraId, fileId, logger }) => {
  logger(`cameraFileController.getOne fileId: ${fileId}`);

  const file = await cameraFileRepo.getOne({ userId, cameraId, fileId, logger });

  if (!file) {
    logger(`cameraFileController.deleteOne fileId: ${fileId} - not found`);
    throw new Error('file not found');
  }

  return file;
};

const deleteOne = async ({ userId, cameraId, fileId, logger }) => {
  logger(`cameraFileController.deleteOne fileId: ${fileId}`);

  const file = await cameraFileRepo.getOne({ userId, cameraId, fileId, logger });

  if (!file) {
    logger(`cameraFileController.deleteOne fileId: ${fileId} - not found`);
    throw new Error('file not found');
  }

  return await cameraFileRepo.deleteOne({ userId, cameraId, fileId, logger });
};

export default { getAll, getOne, deleteOne };
