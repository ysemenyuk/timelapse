import cameraFileRepository from '../repositories/cameraFile.repository.js';

const getAll = async ({ userId, cameraId, query, logger }) => {
  logger.info(`cameraFileController.getAll cameraId: ${cameraId}`);
  const files = await cameraFileRepository.getAll({ userId, cameraId, query, logger });
  return files;
};

const deleteOne = async ({ userId, cameraId, fileId, logger }) => {
  logger.info(`cameraFileController.deleteOne fileId: ${fileId}`);

  const file = await cameraFileRepository.getOne({ userId, cameraId, fileId, logger });

  if (!file) {
    logger.error(`cameraFileController.deleteOne fileId: ${fileId} - not found`);
    throw new Error('file not found');
  }

  return await cameraFileRepository.deleteOne({ userId, cameraId, fileId, logger });
};

export default { getAll, deleteOne };
