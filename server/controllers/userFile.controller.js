import _ from 'lodash';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';
import { promisifyUploadStream } from '../utils/index.js';
import userRepository from '../repositories/user.repository.js';
import userFileRepository from '../repositories/userFile.repository.js';
import staticFileRepo from '../repositories/staticFile.repository.js';

const uploadAvatar = async ({ userId, file, logger }) => {
  logger(`userController.uploadAvatar userId: ${userId}`);

  // TODO: check file type

  const fileData = file.data;
  const fileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;

  const uploadStream = staticFileRepo.openUploadStream({ fileName, logger });

  Readable.from(fileData).pipe(uploadStream);

  await promisifyUploadStream(uploadStream);

  const avatar = await userFileRepository.createOne({
    user: userId,
    name: fileName,
    type: file.mimetype,
    fileId: uploadStream.id,
    logger,
  });

  // TODO: delete old file from gridfs

  const user = await userRepository.updateAvatar({ userId, avatar, logger });
  return { user: _.pick(user, ['_id', 'name', 'email', 'avatar']) };
};

const deleteAvatar = async ({ userId, logger }) => {
  logger(`userController.deleteAvatar userId: ${userId}`);

  // TODO: delete old file fom gridfs

  const avatar = { name: 'no_img.jpg' };

  const user = await userRepository.updateAvatar({ userId, avatar, logger });
  return { user: _.pick(user, ['_id', 'name', 'email', 'avatar']) };
};

export default {
  uploadAvatar,
  deleteAvatar,
};
