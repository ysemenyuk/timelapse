import Camera from '../models/camera.js';

const getAll = async ({ userId }) => {
  return await Camera.find({ user: userId });
};

const getOne = async ({ userId, cameraId }) => {
  // console.log('- camera.actions getOne -', { userId, cameraId });

  const camera = await Camera.findOne({ user: userId, _id: cameraId });

  if (!camera) {
    throw new Error('camera not found');
  }

  return camera;
};

const createOne = async ({ userId, payload }) => {
  // console.log('- camera.actions createOne -', { userId, payload });
  const camera = new Camera({ user: userId, ...payload });
  await camera.save();
  return camera;
};

const updateOne = async ({ userId, cameraId, payload }) => {
  // console.log('- camera.actions updateOne -', { userId, cameraId, payload });
  const camera = await Camera.findOne({ user: userId, _id: cameraId });

  if (!camera) {
    throw new Error('camera not found');
  }

  await camera.update(payload);
  const upadatedCamera = await Camera.findOne({ user: userId, _id: cameraId });

  return upadatedCamera;
};

const deleteOne = async ({ userId, cameraId }) => {
  // console.log('- camera.actions deleteOne -', { userId, cameraId });
  const camera = await Camera.findOne({ user: userId, _id: cameraId });

  if (!camera) {
    throw new Error('camera not found');
  }

  return await camera.remove();
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
