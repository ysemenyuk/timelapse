import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
// import morgan from 'morgan';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import fileUpload from 'express-fileupload';
import { Readable } from 'stream';

import logger from './libs/logger.js';
import userRoutes from './routes/user.routes.js';
import cameraRoutes from './routes/camera.routes.js';
import folderRoutes from './routes/folder.routes.js';
import filesRoutes from './routes/file.routes.js';
import screenshotByTimeRoutes from './routes/screenshotByTime.routes.js';

// import authMiddleware from './middleware/authMiddleware.js';
import loggerMiddleware from './middleware/loggerMiddleware.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';

import __dirname from './dirname.js';

logger.info(`__dirname - ${__dirname}`);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const { MongoClient } = mongodb;

const PORT = process.env.PORT || 4000;
const dbUri = process.env.MONGO_URI;

const mongoClient = new MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (process.env.NODE_ENV === 'development') {
  app.use(loggerMiddleware);
}

app.use(express.json());
app.use(fileUpload());

app.use(function (req, res, next) {
  const database = mongoClient.db('myFirstDatabase');
  const bucket = new mongodb.GridFSBucket(database);

  req.database = database;
  req.bucket = bucket;
  next();
});

app.get('/files/:fileName', async (req, res) => {
  const { fileName } = req.params;

  const file = await req.database.collection('fs.files').findOne({ filename: fileName });

  // console.log(file);

  // if (file.metadata.user !== req.userId) {
  //   return res.sendStatus(401);
  // }

  const downloadStream = req.bucket.openDownloadStreamByName(fileName);
  downloadStream.pipe(res);
  downloadStream.on('error', () => res.sendStatus(404));
});

app.post('/files', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No file.');
  }

  const file = req.files.file.data;
  const fileName = req.files.file.name;

  Readable.from(file).pipe(req.bucket.openUploadStream(fileName));
  res.send(fileName);
});

app.use('/files/assets', express.static(path.join(__dirname, 'assets')));
app.use('/files', express.static(path.join(__dirname, '..', 'cameras')));

app.use('/api/user', userRoutes);
app.use('/api/cameras', cameraRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/files', filesRoutes);
app.use('/api/screenshots', screenshotByTimeRoutes);

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
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );
  } catch (e) {
    console.log('catch err', e);
  }
};

start();
