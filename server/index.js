import path from 'path';
import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import mongodb from 'mongodb';

const { MongoClient } = mongodb;

import logger from './libs/logger.js';
import userRoutes from './routes/user.routes.js';
import cameraRoutes from './routes/camera.routes.js';

import loggerMiddleware from './middleware/loggerMiddleware.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';

import __dirname from './dirname.js';

logger.info(`__dirname - ${__dirname}`);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.use(loggerMiddleware);
}

app.use(express.json());

app.use('/files/assets', express.static(path.join(__dirname, 'assets')));
app.use('/files', express.static(path.join(__dirname, '..', 'cameras')));

app.use('/api/user', userRoutes);
app.use('/api/cameras', cameraRoutes);

app.use('/api/files', (req, res) => {
  res.send([]);
});

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const start = async () => {
  try {
    await client.connect();

    await client.db('myFirstDatabase').command({ ping: 1 });
    console.log('Connected successfully to server');

    const database = client.db('myFirstDatabase');

    const bucket = new mongodb.GridFSBucket(database);

    let uploadStream = bucket.openUploadStream('image.png');
    let id = uploadStream.id;

    fs.createWriteStream('./image.png')
      // .pipe(uploadStream)

      .on('error', () => {
        console.log('error', error);
      })

      .on('open', () => {
        console.log('open');
      })

      .on('ready', () => {
        console.log('ready');
      })

      .on('close', () => {
        console.log('finish');
      });

    // const cameras = database.collection('cameras');
    // const query = { name: 'Name 123' };
    // const camera = await cameras.findOne(query);

    // console.log(camera);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);

    app.listen(
      PORT,
      // console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );
  } catch (e) {
    console.log(111, e);
  } finally {
    await client.close();
  }
};

start();
