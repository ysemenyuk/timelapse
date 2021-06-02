import User from '../models/user.js';

const getOne = async ({ userId, cameraId }) => {
  // console.log('- camera.actions getOne -', { userId, cameraId });
};

const createOne = async ({ userId, payload }) => {
  // console.log('- camera.actions createOne -', { userId, payload });
};

const updateOne = async ({ userId, cameraId, payload }) => {
  // console.log('- camera.actions updateOne -', { userId, cameraId, payload });
};

const deleteOne = async ({ userId, cameraId }) => {
  // console.log('- camera.actions deleteOne -', { userId, cameraId });
};

export default { getOne, createOne, updateOne, deleteOne };
