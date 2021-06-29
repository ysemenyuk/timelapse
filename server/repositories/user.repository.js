import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const getById = async ({ userId, logger }) => {
  logger(`userRepository.getById userId: ${userId}`);
  return await User.findById(userId);
};

const getByEmail = async ({ email, logger }) => {
  logger(`userRepository.getByEmail email: ${email}`);
  return await User.findOne({ email });
};

const createOne = async ({ payload, logger }) => {
  logger(`userRepository.createOne userId: ${userId}`);

  const { email, password } = payload;
  const hashPassword = await bcrypt.hash(password, 8);
  const user = new User({ email, password: hashPassword });

  return await user.save();
};

const updateOne = async ({ userId, payload, logger }) => {
  logger(`userRepository.updateOne userId: ${userId}`);

  console.log(payload);

  const { name, email, password } = payload;
  const hashPassword = await bcrypt.hash(password, 8);

  return await User.findOneAndUpdate(
    { _id: userId },
    { name, email, password: hashPassword },
    { new: true }
  );
};

const deleteOne = async ({ userId, logger }) => {
  logger(`userRepository.deleteOne userId: ${userId}`);
  const user = await User.findById(userId);
  return await user.remove();
};

const updateAvatar = async ({ userId, avatar, logger }) => {
  logger(`userRepository.updateAvatar userId: ${userId}`);

  console.log(avatar);

  return await User.findOneAndUpdate({ _id: userId }, { avatar: avatar.name }, { new: true });
};

export default { getById, getByEmail, createOne, updateOne, deleteOne, updateAvatar };
