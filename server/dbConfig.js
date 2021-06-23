import mongodb from 'mongodb';

const { MongoClient } = mongodb;

const dbUri = process.env.MONGO_URI;

const mongoClient = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const getBucket = () => {
  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);
  return bucket;
};

export default mongoClient;
