import File from '../models/file.js';

const getAll = async ({ userId, logger }) => {
  logger(`userFileRepository.getAll userId: ${userId}`);
  // return await File.find({ user: userId });
};

const getOne = async ({ userId, fileId, logger }) => {
  logger(`userFileRepository.getOne fileId: ${fileId}`);
  // return await File.findOne({ user: userId, _id: fileId });
};

const createOne = async ({ userId, name, logger }) => {
  logger(`userFileRepository.createOne fileName: ${name}`);

  const file = new File({
    user: userId,
    name,
  });

  // console.log('userFileRepository.createOne file', file);

  file.save();

  return file;
};

const deleteOne = async ({ userId, fileId, logger }) => {
  logger(`userFileRepository.deleteOne fileId: ${fileId}`);
  // return await File.findOneAndDelete({ user: userId, _id: fileId });
};

export default { getAll, getOne, createOne, deleteOne };
