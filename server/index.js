import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import debug from 'debug';
import path from 'path';

import mongoClient from './dbConfig.js';

import userRouter from './routes/user.router.js';
import cameraRouter from './routes/camera.router.js';
import cameraScreenshotRouter from './routes/cameraScreenshot.router.js';
import cameraFolderRouter from './routes/cameraFolder.router.js';
import cameraFileRouter from './routes/cameraFile.router.js';
import cameraTaskRouter from './routes/cameraTask.router.js';

import staticFileRouter from './routes/staticFile.router.js';

// import winstonMiddleware from './middleware/winstonMiddleware.js';
import debugMiddleware from './middleware/debugMiddleware.js';

// import userFileMiddleware from './middleware/userFileMiddleware.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';

import __dirname from './dirname.js';
console.log(__dirname);

const app = express();
const logger = debug('server');

const PORT = process.env.PORT || 4000;
const dbUri = process.env.MONGO_URI;

if (process.env.NODE_ENV === 'development') {
  // app.use(winstonMiddleware);
  app.use(debugMiddleware);
}

app.use(express.json());
app.use(fileUpload());

const staticPath = path.join(__dirname, 'assets');
console.log(staticPath);

app.use('/assets', express.static(staticPath));
app.use('/files', staticFileRouter);
// app.use('/files/userfiles', userFileMiddleware, userFileRouter);

app.use('/api/user', userRouter);

app.use('/api/cameras/:cameraId/screenshots', cameraScreenshotRouter);
app.use('/api/cameras/:cameraId/folders', cameraFolderRouter);
app.use('/api/cameras/:cameraId/files', cameraFileRouter);
app.use('/api/cameras/:cameraId/tasks', cameraTaskRouter);
app.use('/api/cameras', cameraRouter);

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await mongoClient.connect();
    logger(`MongoClient successfully Connected`);

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    logger(`Mongoose successfully Connected`);

    app.listen(PORT, logger(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
  } catch (e) {
    console.log('catch err', e);
  }
};

start();
