import cameraFileRepository from '../repositories/cameraFile.repository.js';

const getAll = async ({ userId, cameraId, query, logger }) => {
  logger.info(`cameraFileController.getAll cameraId: ${cameraId}`);
  const files = await cameraFileRepository.getAll({ userId, cameraId, query, logger });
  return files;
};

export default { getAll };
