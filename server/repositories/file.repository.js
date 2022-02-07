import CameraFile from '../models/File.js';

const getAll = async ({ camera, parent, logger }) => {
  logger(`file.repository.getAll camera: ${camera}`);
  return await CameraFile.find({
    camera,
    parent,
    // date: { $gte: new Date('2021-01-31T15:00:30'), $lt: new Date('2022-01-31T15:00:35') },
  });
};

const getOneById = async ({ id, logger }) => {
  logger(`file.repository.getOneById id: ${id}`);
  return await CameraFile.findOne({ _id: id });
};

const getOneByName = async ({ name, logger }) => {
  logger(`file.repository.getOneByName name: ${name}`);
  return await CameraFile.findOne({ name });
};

const createOne = async ({ date, name, user, camera, parent, storage, path, type, logger }) => {
  logger(`file.repository.createFile fileName: ${name}`);

  const file = new CameraFile({
    date,
    name,
    user,
    camera,
    parent,
    storage,
    path,
    type,
  });

  await file.save();
  return file;
};

const updateOne = async ({ id, payload, logger }) => {
  logger(`file.repository.updateOne id: ${id}, payload: ${payload}`);
  return await CameraFile.updateOne({ _id: id }, payload);
};

const deleteOne = async ({ id, logger }) => {
  logger(`file.repository.deleteById id: ${id}`);
  return await CameraFile.findOneAndDelete({ _id: id });
};

const deleteMany = async ({ ids, logger }) => {
  logger(`file.repository.deleteMany`);

  // console.log('ids', ids);

  return await CameraFile.deleteMany({ _id: { $in: ids } });
};

export default { getAll, getOneById, getOneByName, createOne, updateOne, deleteOne, deleteMany };
