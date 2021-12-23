import cameraFileRepo from '../repositories/cameraFile.repository.js';

const getAll = async ({ userId, cameraId, parentId, logger }) => {
  logger(`cameraFileController.getAll cameraId: ${cameraId}`);

  const files = await cameraFileRepo.getAll({ userId, cameraId, parentId, logger });
  return files;
};

const getOne = async ({ userId, cameraId, fileId, logger }) => {
  logger(`cameraFileController.getOne fileId: ${fileId}`);

  const file = await cameraFileRepo.getOne({ userId, cameraId, fileId, logger });

  if (!file) {
    logger(`cameraFileController.getOne fileId: ${fileId} - not found`);
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

  // delete file from gridfs

  return await cameraFileRepo.deleteOne({ userId, cameraId, fileId, logger });
};

const deleteMany = async ({ userId, cameraId, filesIds, logger }) => {
  logger(`cameraFileController.deleteMany`);

  // delete files from gridfs

  return await cameraFileRepo.deleteMany({ userId, cameraId, filesIds, logger });
};

export default { getAll, getOne, deleteOne, deleteMany };
