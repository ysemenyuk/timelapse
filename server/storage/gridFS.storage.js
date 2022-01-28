import mongodb from 'mongodb';
import mongoClient from '../dbConfig.js';

const openUploadStream = ({ fileName, logger }) => {
  logger(`gridFs.storage.openUploadStream fileName: ${fileName}`);

  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);
  const uploadStream = bucket.openUploadStream(fileName);

  return uploadStream;
};

const openDownloadStream = ({ file, logger }) => {
  logger(`gridFs.storage.openDownloadStream file.name isThumbnail: ${file.name}`);

  if (!file.name) {
    throw new Error('gridFs.storage.openDownloadStream have not file.name');
  }

  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);
  const stream = bucket.openDownloadStreamByName(file.name);

  return stream;
};

const deleteOne = ({ file, logger }) => {
  logger(`gridFs.storage.deleteOne file.name: ${file.name}`);

  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);

  // return bucket.delete(file);
};

export default { openUploadStream, openDownloadStream, deleteOne };
