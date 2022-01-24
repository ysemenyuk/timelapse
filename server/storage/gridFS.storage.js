import mongodb from 'mongodb';
import mongoClient from '../dbConfig.js';
import imageService from '../services/image.service.js';
import * as consts from '../utils/constants.js';

const openUploadStream = ({ fileName }, logger) => {
  logger(`gridFs.storage.openUploadStream fileName: ${fileName}`);

  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);
  const uploadStream = bucket.openUploadStream(fileName);

  return uploadStream;
};

const openDownloadStream = ({ file, isThumbnail }, logger) => {
  logger(`gridFs.storage.openDownloadStream file.name isThumbnail: ${(file.name, isThumbnail)}`);

  if (!file.name) {
    throw new Error('file not found');
  }

  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);
  const stream = bucket.openDownloadStreamByName(file.name);

  return isThumbnail ? stream.pipe(imageService.resize(consts.THUMBNAIL_SIZE)) : stream;
};

const deleteOne = ({ file }, logger) => {
  logger(`gridFs.storage.deleteOne file.name: ${file.name}`);

  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);

  // return bucket.delete(file);
};

export default { openUploadStream, openDownloadStream, deleteOne };
