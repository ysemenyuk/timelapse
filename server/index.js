import express from 'express';
import mongoose from 'mongoose';
import mongodb from 'mongodb';
import fileUpload from 'express-fileupload';
import debug from 'debug';
import userRouter from './routes/user.router.js';
import cameraRouter from './routes/camera.router.js';
import fileRouter from './routes/file.router.js';
import taskRouter from './routes/task.router.js';
import debugMiddleware from './middleware/debugMiddleware.js';
import storageRouter from './routes/storage.router.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';
// import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import initWorker from './worker.js';
import initStorage from './storage.js';
import __dirname from './dirname.js';

const { MongoClient } = mongodb;

const mode = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 4000;
const dbUri = process.env.MONGO_URI;
const storageType = process.env.STORAGE_TYPE || 'gridfs';
const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];

const logger = debug('server');

logger(`mode ${mode}`);
logger(`storageType ${storageType}`);

const app = express();
const httpServer = http.createServer(app);

// const io = new Server(httpServer, {
//   cors: { origin: '*' },
// });

// io.on('connection', (socket) => {
//   logger('user connected');

//   socket.on('disconnect', () => {
//     logger('user disconnected');
//   });
// });

// app.use((req, res, next) => {
//   req.io = io;
//   return next();
// });

if (process.env.NODE_ENV === 'development') {
  app.use(debugMiddleware);
}

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const startServer = async () => {
  try {
    const mongoClient = new MongoClient(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await mongoClient.connect();

    logger(`MongoClient successfully Connected`);

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    logger(`Mongoose successfully Connected`);

    app.storage = initStorage(storageType, mongoClient);
    app.worker = initWorker(jobTypes, mongoClient);

    await app.worker.start();

    app.use('/files', storageRouter(app));
    app.use('/api/users', userRouter(app));
    app.use('/api/cameras/:cameraId/tasks', taskRouter(app));
    app.use('/api/cameras/:cameraId/files', fileRouter(app));
    app.use('/api/cameras', cameraRouter(app));

    app.use((req, res, next) => {
      res.status(404).send('Sorry cant find that!');
    });

    app.use(errorHandlerMiddleware);

    httpServer.listen(PORT, () => {
      logger(`httpServer running in ${mode} mode on port ${PORT}`);
    });
  } catch (e) {
    console.log('catch err', e);
  }
};

startServer();
