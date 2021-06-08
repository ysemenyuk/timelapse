import bcrypt from 'bcryptjs';
import _ from 'lodash';

import jwt from '../libs/token.js';

import { BadRequestError } from '../middleware/errorHandlerMiddleware.js';
import userRepository from '../repositories/user.repository.js';

const singUp = async ({ payload }) => {
  // console.log('- user.controller singup payload -', payload);

  const { email, password } = payload;

  const user = await userRepository.getOne({ email });

  if (user) {
    throw new BadRequestError(`User with email ${email} already exist`);
  }

  const newUser = await userRepository.createOne({
    payload: { email, password },
  });

  await newUser.save();
};

const logIn = async ({ payload }) => {
  // console.log('- user.controller login payload -', payload);

  const { email, password } = payload;

  const user = await userRepository.getOne({ email });
  const isPassValid = bcrypt.compareSync(password, user.password);

  if (!user || !isPassValid) {
    throw new BadRequestError(`Invalid email or password`);
  }

  const token = jwt.sign(user._id);

  return { token, user: _.pick(user, ['_id', 'name', 'email']) };
};

const auth = async ({ userId }) => {
  // console.log('- user.controller /auth user -', user);
  const user = await userRepository.getById(userId);

  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  return { token, user: _.pick(user, ['_id', 'name', 'email']) };
};

const getOne = async ({ userId }) => {
  // console.log('- /getOne updateOne.body -', req.body);
  const user = await userRepository.getById(userId);

  return { user: _.pick(user, ['_id', 'name', 'email']) };
};

const updateOne = async ({ userId, payload }) => {
  // console.log('- /getOne updateOne.body -', req.body);
  await userRepository.updateOne({ userId, payload });

  const updatedUser = await userRepository.getById(userId);

  return { user: _.pick(updatedUser, ['_id', 'name', 'email']) };
};

const deleteOne = async ({ userId }) => {
  // console.log('- /deleteOne req.params -', req.params);
  return await userRepository.deleteOne({ userId });
};

export default {
  singUp,
  logIn,
  auth,
  getOne,
  updateOne,
  deleteOne,
};
