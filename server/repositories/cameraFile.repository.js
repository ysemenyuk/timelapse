import File from '../models/file.js';

const getAll = async ({ userId, cameraId, query, logger }) => {
  logger(`cameraFileRepository.getAll cameraId: ${cameraId}`);
  const files = await File.find({ user: userId, camera: cameraId, parent: query.parentId });
  return files;
};

const getOne = async ({ userId, cameraId, fileId, logger }) => {
  logger(`cameraFileRepository.getOne fileId: ${fileId}`);
  return await File.findOne({ user: userId, camera: cameraId, _id: fileId });
};

const createOne = async ({ userId, cameraId, name, original, preview, parent, logger }) => {
  logger(`cameraFileRepository.createOne fileName: ${name}`);

  const file = new File({
    user: userId,
    camera: cameraId,
    name,
    original,
    preview,
    parent,
  });

  // console.log('screenshotRepository.createOne file', file);

  file.save();

  return file;
};

const deleteOne = async ({ userId, cameraId, fileId, logger }) => {
  logger(`cameraFileRepository.deleteOne fileId: ${fileId}`);
  return await File.findOneAndDelete({ user: userId, camera: cameraId, _id: fileId });
};

const deleteMany = async ({ userId, cameraId, filesIds, logger }) => {
  logger(`cameraFileRepository.deleteMany`);
  // return await File.findOneAndDelete({ user: userId, camera: cameraId, _id: fileId });
};

export default { getAll, getOne, createOne, deleteOne, deleteMany };
