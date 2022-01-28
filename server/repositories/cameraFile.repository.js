import CameraFile from '../models/CameraFile.js';

const getAll = async ({ userId, cameraId, parentId, logger }) => {
  logger(`cameraFileRepository.getAll cameraId: ${cameraId}`);
  return await CameraFile.find({
    user: userId,
    camera: cameraId,
    parent: parentId,
  });
};

const getOne = async ({ userId, cameraId, fileId, logger }) => {
  logger(`cameraFileRepository.getOne fileId: ${fileId}`);
  return await CameraFile.findOne({ user: userId, camera: cameraId, _id: fileId });
};

const getOneByName = async ({ fileName, logger }) => {
  logger(`cameraFileRepository.getOne fileName: ${fileName}`);
  return await CameraFile.findOne({ name: fileName });
};

const createOne = async ({ date, name, user, camera, parent, storage, path, logger }) => {
  logger(`cameraFileRepository.createOne fileName: ${name}`);

  const file = new CameraFile({
    date,
    name,
    user,
    camera,
    parent,
    storage,
    path,
  });

  await file.save();
  return file;
};

const deleteOne = async ({ userId, cameraId, fileId, logger }) => {
  logger(`cameraFileRepository.deleteOne fileId: ${fileId}`);
  return await CameraFile.findOneAndDelete({ user: userId, camera: cameraId, _id: fileId });
};

const deleteMany = async ({ userId, cameraId, filesIds, logger }) => {
  logger(`cameraFileRepository.deleteMany`);

  console.log('filesIds', filesIds);

  return await CameraFile.deleteMany({ user: userId, camera: cameraId, _id: { $in: filesIds } });
};

export default { getAll, getOne, getOneByName, createOne, deleteOne, deleteMany };
