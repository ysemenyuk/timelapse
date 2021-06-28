import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
// import morgan from 'morgan';
import colors from 'colors';

import mongoClient from './dbConfig.js';
import logger from './libs/logger.js';

import userRouter from './routes/user.router.js';
import cameraRouter from './routes/camera.router.js';
import cameraScreenshotRouter from './routes/cameraScreenshot.router.js';
import cameraFolderRouter from './routes/cameraFolder.router.js';
import cameraFileRouter from './routes/cameraFile.router.js';
import cameraTaskRouter from './routes/cameraTask.router.js';

import fileRouter from './routes/file.router.js';

import loggerMiddleware from './middleware/loggerMiddleware.js';
// import authMiddleware from './middleware/authMiddleware.js';
// import userFileMiddleware from './middleware/userFileMiddleware.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';

import __dirname from './dirname.js';

logger.info(`__dirname - ${__dirname}`);

const app = express();

const PORT = process.env.PORT || 4000;
const dbUri = process.env.MONGO_URI;

if (process.env.NODE_ENV === 'development') {
  app.use(loggerMiddleware);
  // app.use(morgan('dev'));
}

app.use(express.json());
app.use(fileUpload());

app.use('/files', fileRouter);
// app.use('/files/userfiles', userFileMiddleware, userFileRouter);

app.use('/api/user', userRouter);

app.use('/api/cameras', cameraRouter);
app.use('/api/cameras/:cameraId/screenshots', cameraScreenshotRouter);
app.use('/api/cameras/:cameraId/folders', cameraFolderRouter);
app.use('/api/cameras/:cameraId/files', cameraFileRouter);
app.use('/api/cameras/:cameraId/tasks', cameraTaskRouter);

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
    console.log(`mongoClient successfully Connected ${colors.red(PORT)}`);

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
