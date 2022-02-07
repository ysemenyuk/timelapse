import bcrypt from 'bcryptjs';
import _ from 'lodash';
import jwt from '../libs/token.js';
import { BadRequestError } from '../middleware/errorHandlerMiddleware.js';
import userRepository from '../repositories/user.repository.js';

export default () => {
  const singUp = async ({ payload, logger }) => {
    logger(`userController.singUp payload: ${payload}`);

    const { email, password } = payload;

    // console.log('payload', payload);

    const user = await userRepository.getByEmail({ email, logger });

    if (user) {
      logger(`userController.singUp email ${email} - already exist`);
      throw new BadRequestError(`User with email ${email} already exist`);
    }

    const newUser = await userRepository.createOne({
      email,
      password,
      logger,
    });

    // console.log('newUser', newUser);

    const token = jwt.sign(newUser._id);

    return { token, user: _.pick(newUser, ['_id', 'name', 'email', 'avatar']) };
  };

  const logIn = async ({ payload, logger }) => {
    const { email, password } = payload;
    logger(`userController.logIn email: ${email}`);

    const user = await userRepository.getByEmail({ email, logger });

    if (!user) {
      logger(`userController.logIn Invalid email`);
      throw new BadRequestError(`Invalid email`);
    }

    const isPassValid = bcrypt.compareSync(password, user.password);

    if (!isPassValid) {
      logger(`userController.logIn Invalid password`);
      throw new BadRequestError(`Invalid password`);
    }

    const token = jwt.sign(user._id);

    return { token, user: _.pick(user, ['_id', 'name', 'email', 'avatar']) };
  };

  const auth = async ({ userId, logger }) => {
    logger(`userController.auth userId: ${userId}`);

    const user = await userRepository.getById({ id: userId, logger });

    const token = jwt.sign(user._id);

    return { token, user: _.pick(user, ['_id', 'name', 'email', 'avatar']) };
  };

  const getOne = async ({ userId, logger }) => {
    logger(`userController.getOne userId: ${userId}`);

    const user = await userRepository.getById({ id: userId, logger });

    return { user: _.pick(user, ['_id', 'name', 'email', 'avatar']) };
  };

  const updateOne = async ({ userId, payload, logger }) => {
    logger(`userController.updateOne userId: ${userId}`);

    const updatedUser = await userRepository.updateOne({ id: userId, payload, logger });

    return { user: _.pick(updatedUser, ['_id', 'name', 'email', 'avatar']) };
  };

  const deleteOne = async ({ userId, logger }) => {
    logger(`userController.deleteOne userId: ${userId}`);

    return await userRepository.deleteOne({ id: userId, logger });
  };

  return {
    singUp,
    logIn,
    auth,
    getOne,
    updateOne,
    deleteOne,
  };
};
