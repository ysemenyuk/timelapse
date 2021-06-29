import bcrypt from 'bcryptjs';
import _ from 'lodash';

import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

import staticFileRepo from '../repositories/staticFile.repository.js';

import jwt from '../libs/token.js';

import { BadRequestError } from '../middleware/errorHandlerMiddleware.js';
import userRepository from '../repositories/user.repository.js';
import userFileRepository from '../repositories/userFile.repository.js';

const singUp = async ({ payload, logger }) => {
  logger(`userController.singUp payload: ${payload}`);

  const { email, password } = payload;

  console.log('payload', payload);

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

  console.log('newUser', newUser);

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

  const user = await userRepository.getById({ userId, logger });

  const token = jwt.sign(user._id);

  return { token, user: _.pick(user, ['_id', 'name', 'email', 'avatar']) };
};

const getOne = async ({ userId, logger }) => {
  logger(`userController.getOne userId: ${userId}`);

  const user = await userRepository.getById({ userId, logger });

  return { user: _.pick(user, ['_id', 'name', 'email', 'avatar']) };
};

const uploadAvatar = async ({ userId, file, logger }) => {
  logger(`userController.uploadAvatar userId: ${userId}`);

  // check file type

  const fileData = file.data;
  const fileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;

  const uploadStream = staticFileRepo.openUploadStream({ fileName, logger });

  Readable.from(fileData).pipe(uploadStream);

  return new Promise((resolve, reject) => {
    uploadStream.on('error', () => {
      console.log('error uploadStream streem');
      reject('file upload error');
    });

    uploadStream.on('finish', () => {
      console.log('finish uploadStream streem');
    });

    uploadStream.on('close', async () => {
      console.log('close uploadStream streem');

      const avatar = await userFileRepository.createOne({
        user: userId,
        name: fileName,
        type: file.mimetype,
        logger,
      });

      // console.log('avatar', avatar);

      // delete old file from gridfs

      const user = await userRepository.updateAvatar({ userId, avatar, logger });

      resolve({ user: _.pick(user, ['_id', 'name', 'email', 'avatar']) });
    });
  });
};

const deleteAvatar = async ({ userId, logger }) => {
  logger(`userController.deleteAvatar userId: ${userId}`);

  // delete old file fom gridfs

  const avatar = { name: 'no_img.jpg' };

  const user = await userRepository.updateAvatar({ userId, avatar, logger });

  return { user: _.pick(user, ['_id', 'name', 'email', 'avatar']) };
};

const updateOne = async ({ userId, payload, logger }) => {
  logger(`userController.updateOne userId: ${userId}`);

  const updatedUser = await userRepository.updateOne({ userId, payload, logger });

  return { user: _.pick(updatedUser, ['_id', 'name', 'email', 'avatar']) };
};

const deleteOne = async ({ userId, logger }) => {
  logger(`userController.deleteOne userId: ${userId}`);

  return await userRepository.deleteOne({ userId, logger });
};

export default {
  singUp,
  logIn,
  auth,
  uploadAvatar,
  deleteAvatar,
  getOne,
  updateOne,
  deleteOne,
};
