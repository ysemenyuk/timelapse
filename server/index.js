import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import Busboy from 'busboy';
import assert from 'assert';

import logger from './libs/logger.js';
import userRoutes from './routes/user.routes.js';
import cameraRoutes from './routes/camera.routes.js';

import loggerMiddleware from './middleware/loggerMiddleware.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';

import __dirname from './dirname.js';

logger.info(`__dirname - ${__dirname}`);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const { MongoClient, ObjectID } = mongodb;

const PORT = process.env.PORT || 4000;
const dbUri = process.env.MONGO_URI;

const mongoClient = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(loggerMiddleware);
}

app.use(express.json());

app.use(function (req, res, next) {
  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);

  req.bucket = bucket;
  next();
});

app.get('/files/:fileName', (req, res) => {
  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);

  const { fileName } = req.params;
  // const id = new ObjectID(fileId);

  bucket.openDownloadStreamByName(fileName).pipe(res);
});

app.use('/files/assets', express.static(path.join(__dirname, 'assets')));
app.use('/files', express.static(path.join(__dirname, '..', 'cameras')));

app.use('/api/user', userRoutes);
app.use('/api/cameras', cameraRoutes);

app.get('/api/files', (req, res) => {
  res.send([]);
});

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await mongoClient.connect();
    logger.info(`mongoClient successfully Connected`);

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    logger.info(`mongoose successfully Connected`);

    app.listen(
      PORT,
      // console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );
  } catch (e) {
    console.log('catch err', e);
  }
};

start();
