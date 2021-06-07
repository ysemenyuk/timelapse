import User from '../models/user.js';

const getById = async (id) => {
  // console.log('- user.actions getOne -', { userId, cameraId });
  return await User.findById(id);
};

const getOne = async ({ ...args }) => {
  // console.log('- user.actions getOne -', { userId, cameraId });
  return await User.findOne({ ...args });
};

const createOne = async ({ payload }) => {
  // console.log('- user.actions createOne -', { userId, payload });
  const user = new User(payload);
  return await user.save();
};

const updateOne = async ({ userId, payload }) => {
  // console.log('- user.actions updateOne -', { userId, cameraId, payload });
  const user = await User.findById(userId);
  return await user.update(payload);
};

const deleteOne = async ({ userId }) => {
  // console.log('- user.actions deleteOne -', { userId, cameraId });
  const user = await User.findById(userId);
  return await user.remove();
};

export default { getById, getOne, createOne, updateOne, deleteOne };
