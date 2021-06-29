import mongodb from 'mongodb';
import mongoClient from '../dbConfig.js';

const openUploadStream = ({ fileName, logger }) => {
  logger(`staticFileRepository.openUploadStream filename: ${fileName}`);

  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);
  
  return bucket.openUploadStream(fileName);
};

const openDownloadStream = ({ fileId, logger }) => {
  logger(`staticFileRepository.openDownloadStream fileId: ${fileId}`);

  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);

  return bucket.openDownloadStream(fileId);
};

const openDownloadStreamByName = ({ fileName, logger }) => {
  logger(`staticFileRepository.openDownloadStreamByName filename: ${fileName}`);

  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);

  return bucket.openDownloadStreamByName(fileName);
};

const deleteOne = ({ fileId, logger }) => {
  logger(`staticFileRepository.deleteOne fileId: ${fileId}`);

  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);

  return bucket.delete(fileId);
};

export default { openUploadStream, openDownloadStream, openDownloadStreamByName, deleteOne };
