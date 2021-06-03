import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import { BadRequestError } from '../middleware/errorHandlerMiddleware.js';
import userActions from '../actions/user.actions.js';

const singUp = async ({ payload }) => {
  // console.log('- user.controller singup payload -', payload);

  const { email, password } = payload;

  const user = await userActions.getOne({ email });

  if (user) {
    throw new BadRequestError(`User with email ${email} already exist`);
  }

  const hashPassword = await bcrypt.hash(password, 8);
  const newUser = userActions.createOne({ payload: { email, password: hashPassword } });

  await newUser.save();
};

const logIn = async ({ payload }) => {
  // console.log('- user.controller login payload -', payload);

  const { email, password } = payload;

  const user = await userActions.getOne({ email });
  const isPassValid = bcrypt.compareSync(password, user.password);

  if (!user || !isPassValid) {
    throw new BadRequestError(`Invalid email or password`);
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  return { token, user: _.omit(user, ['password']) };
};

const auth = ({ user }) => {
  // console.log('- user.controller /auth user -', user);

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });

  return { token, user: _.omit(user, ['password']) };
};

const getOne = async ({ user }) => {
  // console.log('- /getOne updateOne.body -', req.body);
};

const updateOne = async ({ user, payload }) => {
  // console.log('- /getOne updateOne.body -', req.body);
};

const deleteOne = async ({ user }) => {
  // console.log('- /deleteOne req.params -', req.params);
};

export default {
  singUp,
  logIn,
  auth,
  getOne,
  updateOne,
  deleteOne,
};
