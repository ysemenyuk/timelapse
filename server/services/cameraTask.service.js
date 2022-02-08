import CameraTask from '../models/CameraTask.js';

const getAll = async ({ camera, logger }) => {
  logger(`task.repository.getAll camera: ${camera}`);
  return await CameraTask.find({ camera });
};

const getOne = async ({ id, logger }) => {
  logger(`task.repository.getOne id: ${id}`);
  return await CameraTask.findOne({ _id: id });
};

const createOne = async ({ user, camera, type, status, job, data, logger }) => {
  logger(`task.repository.createOne type: ${type}`);
  const task = new CameraTask({ user, camera, type, status, job, data });
  return await task.save();
};

const updateOne = async ({ id, payload, logger }) => {
  logger(`task.repository.updateOne id: ${id}, payload: ${payload}`);
  return await CameraTask.updateOne({ _id: id }, payload);
};

const deleteOne = async ({ id, logger }) => {
  logger(`task.repository.deleteOne id: ${id}`);
  const camera = await CameraTask.findOne({ _id: id });
  return await camera.remove();
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
