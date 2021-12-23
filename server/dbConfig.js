import mongodb from 'mongodb';

const { MongoClient } = mongodb;

const dbUri = process.env.MONGO_URI;

const mongoClient = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default mongoClient;
