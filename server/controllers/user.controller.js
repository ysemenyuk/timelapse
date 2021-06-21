import bcrypt from 'bcryptjs';
import _ from 'lodash';

import jwt from '../libs/token.js';

import { BadRequestError } from '../middleware/errorHandlerMiddleware.js';
import userRepository from '../repositories/user.repository.js';

const singUp = async ({ payload, logger }) => {
  logger.info(`userController.singUp payload: ${payload}`);

  const { email, password } = payload;

  const user = await userRepository.getByEmail({ email, logger });

  if (user) {
    logger.error(`userController.singUp email ${email} - already exist`);
    throw new BadRequestError(`User with email ${email} already exist`);
  }

  const newUser = await userRepository.createOne({
    payload: { email, password },
    logger,
  });

  const token = jwt.sign(user._id);

  return { token, user: _.pick(newUser, ['_id', 'name', 'email', 'avatar']) };
};

const logIn = async ({ payload, logger }) => {
  logger.info(`userController.logIn payload: ${payload}`);

  const { email, password } = payload;

  const user = await userRepository.getByEmail({ email, logger });
  const isPassValid = bcrypt.compareSync(password, user.password);

  if (!user || !isPassValid) {
    logger.error(`userController.singUp Invalid email or password`);
    throw new BadRequestError(`Invalid email or password`);
  }

  const token = jwt.sign(user._id);

  return { token, user: _.pick(user, ['_id', 'name', 'email', 'avatar']) };
};

const auth = async ({ userId, logger }) => {
  logger.info(`userController.auth userId: ${userId}`);

  const user = await userRepository.getById({ userId, logger });

  const token = jwt.sign(user._id);

  return { token, user: _.pick(user, ['_id', 'name', 'email', 'avatar']) };
};

const getOne = async ({ userId, logger }) => {
  logger.info(`userController.getOne userId: ${userId}`);

  const user = await userRepository.getById({ userId, logger });

  return { user: _.pick(user, ['_id', 'name', 'email']) };
};

const updateOne = async ({ userId, payload, logger }) => {
  logger.info(`userController.updateOne userId: ${userId}`);

  await userRepository.updateOne({ userId, payload });

  const updatedUser = await userRepository.getById({ userId, logger });

  return { user: _.pick(updatedUser, ['_id', 'name', 'email']) };
};

const deleteOne = async ({ userId, logger }) => {
  logger.info(`userController.deleteOne userId: ${userId}`);

  return await userRepository.deleteOne({ userId, logger });
};

export default {
  singUp,
  logIn,
  auth,
  getOne,
  updateOne,
  deleteOne,
};
