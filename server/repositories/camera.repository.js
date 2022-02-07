import Camera from '../models/Camera.js';

const getAll = async ({ user, logger }) => {
  logger(`camera.repository.getAll user: ${user}`);
  return await Camera.find({ user });
};

const getOne = async ({ id, logger }) => {
  logger(`camera.repository.getOne id: ${id}`);
  return await Camera.findOne({ _id: id }).populate('imagesByTimeTask');
};

const getOneById = async ({ id, logger }) => {
  logger(`camera.repository.getOneById id: ${id}`);
  return await Camera.findOne({ _id: id });
};

const createOne = async ({ user, payload, logger }) => {
  logger(`camera.repository.createOne payload: ${payload}`);
  const camera = new Camera({ user, ...payload });
  return await camera.save();
};

const updateOne = async ({ id, payload, logger }) => {
  logger(`camera.repository.updateOne id: ${id}, payload: ${payload}`);
  return await Camera.updateOne({ _id: id }, payload);
};

const deleteOne = async ({ id, logger }) => {
  logger(`camera.repository.deleteOne id: ${id}`);
  const camera = await Camera.findOne({ _id: id });
  return await camera.remove();
};

export default { getAll, getOne, getOneById, createOne, updateOne, deleteOne };
