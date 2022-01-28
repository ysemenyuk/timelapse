import { createReadStream, createWriteStream } from 'fs';
import __dirname from '../dirname.js';
import path from 'path';

const pathToFiles = path.join(__dirname, 'files');

const openUploadStream = ({ filePath, fileName, logger }) => {
  logger(`disk.storage.openUploadStream fileName: ${fileName}`);

  // TODO: check pathToFiles, make if not exist

  const fullPath = path.join(pathToFiles, filePath, fileName);
  const uploadStream = createWriteStream(fullPath);

  return uploadStream;
};

const openDownloadStream = ({ file, logger }) => {
  logger(`disk.storage.openDownloadStream file.name: ${file.name}`);

  if (!file.path) {
    throw new Error('disk.storage.openDownloadStream have not file.path');
  }

  const fullPath = path.join(pathToFiles, file.path, file.name);
  const stream = createReadStream(fullPath);

  return stream;
};

const deleteOne = ({ file, logger }) => {
  logger(`disk.storage.deleteOne fileId: ${file.name}`);
};

export default { openUploadStream, openDownloadStream, deleteOne };
