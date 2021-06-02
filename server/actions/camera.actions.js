import Camera from '../models/camera.js';

const getAll = async ({ userId }) => {
  return await Camera.find({ user: userId });
};

const getOne = async ({ userId, cameraId }) => {
  // console.log('- camera.actions getOne -', { userId, cameraId });
  return await Camera.findOne({ user: userId, _id: cameraId });
};

const createOne = async ({ userId, payload }) => {
  // console.log('- camera.actions createOne -', { userId, payload });
  const camera = new Camera({ user: userId, ...payload });
  await camera.save();
  return camera;
};

const updateOne = async ({ userId, cameraId, payload }) => {
  // console.log('- camera.actions updateOne -', { userId, cameraId, payload });
};

const deleteOne = async ({ userId, cameraId }) => {
  // console.log('- camera.actions deleteOne -', { userId, cameraId });
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
