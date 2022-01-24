import { createReadStream, createWriteStream } from 'fs';
import imageService from '../services/image.service.js';
import __dirname from '../dirname.js';
import * as consts from '../utils/constants.js';
import path from 'path';

const pathToFiles = path.join(__dirname, 'files');

const openUploadStream = ({ filePath, fileName }, logger) => {
  logger(`disk.storage.openUploadStream fileName: ${fileName}`);

  // TODO: check pathToFiles, filePath make if not exist

  const fullPath = path.join(pathToFiles, filePath, fileName);
  const uploadStream = createWriteStream(fullPath);

  return uploadStream;
};

const openDownloadStream = ({ file, isThumbnail }, logger) => {
  logger(`disk.storage.openDownloadStream file.name: ${file.name}`);

  if (!file.path) {
    throw new Error('file not found');
  }

  const fullPath = path.join(pathToFiles, file.path, file.name);
  const stream = createReadStream(fullPath);

  return isThumbnail ? stream.pipe(imageService.resize(consts.THUMBNAIL_SIZE)) : stream;
};

const deleteOne = ({ file }, logger) => {
  logger(`disk.storage.deleteOne fileId: ${file.name}`);
};

export default { openUploadStream, openDownloadStream, deleteOne };
