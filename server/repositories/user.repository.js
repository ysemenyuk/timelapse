import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const getById = async ({ userId, logger }) => {
  logger.info(`userRepository.getById userId: ${userId}`);
  return await User.findById(userId);
};

const getByEmail = async ({ email, logger }) => {
  logger.info(`userRepository.getByEmail email: ${email}`);
  return await User.findOne({ email });
};

const createOne = async ({ payload, logger }) => {
  logger.info(`userRepository.createOne userId: ${userId}`);

  const { email, password } = payload;
  const hashPassword = await bcrypt.hash(password, 8);
  const user = new User({ email, password: hashPassword });

  return await user.save();
};

const updateOne = async ({ userId, payload, logger }) => {
  logger.info(`userRepository.updateOne userId: ${userId}`);

  console.log(payload);

  const { name, email, password } = payload;
  const hashPassword = await bcrypt.hash(password, 8);

  return await User.updateOne({ _id: userId }, { name, email, password: hashPassword });
};

const deleteOne = async ({ userId, logger }) => {
  logger.info(`userRepository.deleteOne userId: ${userId}`);
  const user = await User.findById(userId);
  return await user.remove();
};

export default { getById, getByEmail, createOne, updateOne, deleteOne };
