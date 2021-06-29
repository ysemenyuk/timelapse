import UserFile from '../models/UserFile.js';

const getAll = async ({ userId, logger }) => {
  logger(`userFileRepository.getAll userId: ${userId}`);

  return await UserFile.find({ user: userId });
};

const getOne = async ({ userId, fileId, logger }) => {
  logger(`userFileRepository.getOne fileId: ${fileId}`);

  return await UserFile.findOne({ user: userId, _id: fileId });
};

const createOne = async ({ userId, name, type, logger }) => {
  logger(`userFileRepository.createOne fileName: ${name}`);

  const file = new UserFile({
    user: userId,
    type,
    name,
  });

  await file.save();

  return file;
};

const deleteOne = async ({ userId, fileId, logger }) => {
  logger(`userFileRepository.deleteOne fileId: ${fileId}`);

  return await UserFile.findOneAndDelete({ user: userId, _id: fileId });
};

export default { getAll, getOne, createOne, deleteOne };
