import CameraFile from '../models/File.js';

const getAll = async ({ userId, cameraId, parentId, logger }) => {
  logger(`fileRepository.getAll cameraId: ${cameraId}`);
  return await CameraFile.find({
    user: userId,
    camera: cameraId,
    parent: parentId,
  });
};

const getOneById = async ({ userId, cameraId, id, logger }) => {
  logger(`fileRepository.getOneById id: ${id}`);
  return await CameraFile.findOne({ user: userId, camera: cameraId, _id: id });
};

const getOneByName = async ({ name, logger }) => {
  logger(`fileRepository.getOneByName name: ${name}`);
  return await CameraFile.findOne({ name: name });
};

const createOne = async ({ date, name, user, camera, parent, storage, path, type, logger }) => {
  logger(`fileRepository.createFile fileName: ${name}`);

  const file = new CameraFile({
    date,
    name,
    user,
    camera,
    parent,
    storage,
    path,
    type
  });

  await file.save();
  return file;
};

const deleteOne = async ({ userId, cameraId, id, logger }) => {
  logger(`fileRepository.deleteById id: ${id}`);
  return await CameraFile.findOneAndDelete({ user: userId, camera: cameraId, _id: id });
};

const deleteMany = async ({ userId, cameraId, ids, logger }) => {
  logger(`fileRepository.deleteMany`);

  // console.log('ids', ids);

  return await CameraFile.deleteMany({ user: userId, camera: cameraId, _id: { $in: ids } });
};

export default { getAll, getOneById, getOneByName, createOne, deleteOne, deleteMany };
