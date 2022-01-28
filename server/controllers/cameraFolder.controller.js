import cameraFolderRepo from '../repositories/cameraFolder.repository.js';

const getAll = async ({ userId, cameraId, parentId, logger }) => {
  logger(`cameraFolderController.getAll cameraId: ${cameraId} parentId: ${parentId}`);

  const folders = await cameraFolderRepo.getAll({ userId, cameraId, parentId, logger });

  return folders;
};

const getOne = async ({ userId, cameraId, folderId, logger }) => {
  logger(`cameraFolderController.getOne folderId: ${folderId}`);

  const folder = await cameraFolderRepo.getOne({ userId, cameraId, folderId, logger });

  if (!folder) {
    logger(`cameraFolderController.getOne folderId: ${folderId} - not found`);
    throw new Error('folder not found');
  }

  return folder;
};

const createOne = async ({ userId, cameraId, parentId, folderName, logger }) => {
  logger(`cameraFolderController.createOne`);

  return await cameraFolderRepo.createOne({ userId, cameraId, parentId, folderName, logger });
};

const deleteOne = async ({ userId, cameraId, folderId, logger }) => {
  logger(`cameraFolderController.deleteOne folderId: ${folderId}`);

  const folder = await cameraFolderRepo.getOne({ userId, cameraId, folderId, logger });

  if (!folder) {
    logger(`cameraFolderController.deleteOne folderId: ${folderId} - not found`);
    throw new Error('folder not found');
  }

  // delete all files from folder

  return await cameraFolderRepo.deleteOne({ userId, cameraId, foldersIds, logger });
};

const deleteMany = async ({ userId, cameraId, foldersIds, logger }) => {
  logger(`cameraFolderController.deleteMany`);

  // delete all files from folders

  return await cameraFolderRepo.deleteMany({ userId, cameraId, foldersIds, logger });
};

export default { getAll, getOne, createOne, deleteOne, deleteMany };
