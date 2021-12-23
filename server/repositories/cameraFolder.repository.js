import CameraFolder from '../models/CameraFolder.js';

const getAll = async ({ userId, cameraId, parentId, logger }) => {
  logger(`cameraFolderRepository.getAll cameraId: ${cameraId} parentId: ${parentId}`);

  const folders = await CameraFolder.find({
    user: userId,
    camera: cameraId,
    parent: parentId,
  });

  return folders;
};

const getOne = async ({ userId, cameraId, folderId, logger }) => {
  logger(`cameraFolderRepository.getOne folderId: ${folderId}`);

  return await CameraFolder.findOne({ user: userId, camera: cameraId, _id: folderId });
};

const createOne = async ({ userId, cameraId, name, parent, logger }) => {
  logger(`cameraFolderRepository.createOne folderId: ${folderId}`);

  const folder = new CameraFolder({
    user: userId,
    camera: cameraId,
    name,
    parent,
  });

  folder.save();

  return folder;
};

const deleteOne = async ({ userId, cameraId, folderId, logger }) => {
  logger(`cameraFolderRepository.deleteOne folderId: ${folderId}`);

  return await CameraFolder.findOneAndDelete({ user: userId, camera: cameraId, _id: fileId });
};

const deleteMany = async ({ userId, cameraId, foldersIds, logger }) => {
  logger(`cameraFolderRepository.deleteMany`);

  console.log('foldersIds', foldersIds);

  return await CameraFolder.deleteMany({
    user: userId,
    camera: cameraId,
    _id: { $in: foldersIds },
  });
};

export default { getAll, getOne, createOne, deleteOne, deleteMany };
