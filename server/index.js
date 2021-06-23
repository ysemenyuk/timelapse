import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

import mongoClient from './dbConfig.js';
import logger from './libs/logger.js';

import userRoutes from './routes/user.routes.js';
import cameraRoutes from './routes/camera.routes.js';
import taskRoutes from './routes/task.routes.js';

import fileRoutes from './routes/file.routes.js';

import loggerMiddleware from './middleware/loggerMiddleware.js';
// import authMiddleware from './middleware/authMiddleware.js';
import userFileMiddleware from './middleware/userFileMiddleware.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';

import __dirname from './dirname.js';
logger.info(`__dirname - ${__dirname}`);

const app = express();

const PORT = process.env.PORT || 4000;
const dbUri = process.env.MONGO_URI;

if (process.env.NODE_ENV === 'development') {
  app.use(loggerMiddleware);
}

app.use(express.json());
app.use(fileUpload());

app.use('/files', fileRoutes);
app.use('/files/userfiles', userFileMiddleware, fileRoutes);

app.use('/api/user', userRoutes);
app.use('/api/cameras', cameraRoutes);
app.use('/api/cameras', taskRoutes);

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
