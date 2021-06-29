import mongodb from 'mongodb';
import mongoClient from '../dbConfig.js';

const openUploadStream = (filename) => {
  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);
  return bucket.openUploadStream(filename);
};

const openDownloadStreamByName = (filename) => {
  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);
  return bucket.openDownloadStreamByName(filename);
};

export default { openUploadStream, openDownloadStreamByName };
