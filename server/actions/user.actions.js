import User from '../models/user.js';

const getOne = async ({ ...args }) => {
  // console.log('- user.actions getOne -', { userId, cameraId });
  return await User.findOne({ ...args });
};

const createOne = async ({ payload }) => {
  // console.log('- user.actions createOne -', { userId, payload });
  const user = new User(payload);
  return await user.save();
};

const updateOne = async ({ userId, cameraId, payload }) => {
  // console.log('- user.actions updateOne -', { userId, cameraId, payload });
};

const deleteOne = async ({ userId, cameraId }) => {
  // console.log('- user.actions deleteOne -', { userId, cameraId });
};

export default { getOne, createOne, updateOne, deleteOne };
