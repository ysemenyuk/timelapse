import UserFile from '../models/UserFile.js';

const getAll = async ({ userId, logger }) => {
  logger(`userFileRepository.getAll userId: ${userId}`);

  return await UserFile.find({ user: userId });
};

const getOne = async ({ userId, fileId, logger }) => {
  logger(`userFileRepository.getOne fileId: ${fileId}`);

  return await UserFile.findOne({ user: userId, _id: fileId });
};

const getOneByName = async ({ fileName, logger }) => {
  logger(`userFileRepository.getOneByName fileName: ${fileName}`);

  return await UserFile.findOne({ name: fileName });
};

const createOne = async ({ user, name, type, fileId, logger }) => {
  logger(`userFileRepository.createOne fileName: ${name}`);

  const file = new UserFile({
    user,
    type,
    name,
    fileId,
  });

  await file.save();

  return file;
};

const deleteOne = async ({ userId, fileId, logger }) => {
  logger(`userFileRepository.deleteOne fileId: ${fileId}`);

  return await UserFile.findOneAndDelete({ user: userId, _id: fileId });
};

export default { getAll, getOne, getOneByName, createOne, deleteOne };
