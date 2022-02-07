import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const getById = async ({ id, logger }) => {
  logger(`user.repository.getById id: ${id}`);
  return await User.findById(id);
};

const getByEmail = async ({ email, logger }) => {
  logger(`user.repository.getByEmail email: ${email}`);
  return await User.findOne({ email });
};

const createOne = async ({ email, password, logger }) => {
  logger(`user.repository.createOne email: ${email}`);

  const hashPassword = await bcrypt.hash(password, 8);
  const user = new User({ email, password: hashPassword });

  return await user.save();
};

const updateOne = async ({ id, payload, logger }) => {
  logger(`user.repository.updateOne id: ${id}`);

  // console.log(payload);

  const { name, email, password } = payload;
  const hashPassword = await bcrypt.hash(password, 8);

  return await User.findOneAndUpdate({ _id: id }, { name, email, password: hashPassword }, { new: true });
};

const deleteOne = async ({ id, logger }) => {
  logger(`user.repositoryy.deleteOne id: ${id}`);
  const user = await User.findById(id);
  return await user.remove();
};

const updateAvatar = async ({ id, avatar, logger }) => {
  logger(`user.repository.updateAvatar id: ${id}`);

  return await User.findOneAndUpdate({ _id: id }, { avatar: avatar.name }, { new: true });
};

export default { getById, getByEmail, createOne, updateOne, deleteOne, updateAvatar };
