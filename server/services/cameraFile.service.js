import CameraFile from '../models/CameraFile.js';

const getAll = async ({ cameraId, parentId, logger }) => {
  logger(`cameraFileService.getAll cameraId: ${cameraId} parentId: ${parentId}`);
  return await CameraFile.find({
    camera: cameraId,
    parent: parentId,
    // date: { $gte: new Date('2021-01-31T15:00:30'), $lt: new Date('2022-01-31T15:00:35') },
  });
};

const getOneById = async ({ fileId, logger }) => {
  logger(`cameraFileService.getOneById fileId: ${fileId}`);
  return await CameraFile.findOne({ _id: fileId });
};

const getOneByName = async ({ fileName, logger }) => {
  logger(`cameraFileService.getOneByName cameraFileName: ${fileName}`);
  return await CameraFile.findOne({ name: fileName });
};

const createOne = async ({ logger, ...payload }) => {
  logger(`cameraFileService.createOne payload: ${payload}`);

  const file = new CameraFile({
    ...payload,
  });

  await file.save();
  return file;
};

const updateOne = async ({ fileId, payload, logger }) => {
  logger(`cameraFileService.updateOne fileId: ${fileId}, payload: ${payload}`);

  const updated = await CameraFile.updateOne({ _id: fileId }, payload);
  return updated;
};

const deleteOne = async ({ fileId, logger }) => {
  logger(`cameraFileService.deleteOne fileId: ${fileId}`);

  const deleted = await CameraFile.findOneAndDelete({ _id: fileId });
  return deleted;
};

const deleteMany = async ({ filesIds, logger }) => {
  logger(`cameraFileService.deleteMany`);

  // console.log('ids', ids);

  const deleted = await CameraFile.deleteMany({ _id: { $in: filesIds } });
  return deleted;
};

export default { getAll, getOneById, getOneByName, createOne, updateOne, deleteOne, deleteMany };
