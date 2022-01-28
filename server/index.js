import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import debug from 'debug';
import path from 'path';
import mongoClient from './dbConfig.js';
import userRouter from './routes/user.router.js';
import cameraRouter from './routes/camera.router.js';
import cameraFolderRouter from './routes/cameraFolder.router.js';
import cameraFileRouter from './routes/cameraFile.router.js';
import cameraTaskRouter from './routes/cameraTask.router.js';
import debugMiddleware from './middleware/debugMiddleware.js';
// import winstonMiddleware from './middleware/winstonMiddleware.js';
import storageRouter from './routes/storage.router.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

import __dirname from './dirname.js';
console.log('__dirname', __dirname);

const assetsPath = path.join(__dirname, 'assets');
console.log('assetsPath', assetsPath);

const logger = debug('server');

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: '*' },
});

const mode = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 4000;
const dbUri = process.env.MONGO_URI;
const storageType = process.env.STORAGE_TYPE || 'disk';

logger(`mode ${mode}`);
logger(`storageType ${storageType}`);

if (process.env.NODE_ENV === 'development') {
  app.use(debugMiddleware);
  // app.use(winstonMiddleware);
}

app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  return next();
});

const messages = [1, 2, 3];

io.on('connection', (socket) => {
  logger('user connected');

  socket.on('messages:get', () => {
    // console.log('messages:get', messages);
    io.emit('messages', messages);
  });

  socket.on('message:add', (message) => {
    // console.log('message:add', message);
    messages.push(message);
    io.emit('messages', messages);
  });

  socket.on('disconnect', () => {
    logger('user disconnected');
  });
});

app.use(express.json());
app.use(fileUpload());

app.use('/assets', express.static(assetsPath));
app.use('/files', storageRouter);

app.use('/api/users', userRouter);

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

const startServer = async () => {
  try {
    await mongoClient.connect();
    logger(`MongoClient successfully Connected`);

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    logger(`Mongoose successfully Connected`);

    app.listen(PORT, logger(`Api server running in ${mode} mode on port ${PORT}`));
    httpServer.listen(5000, logger(`Socket server running in ${mode} mode on port ${5000}`));
  } catch (e) {
    console.log('catch err', e);
  }
};

startServer();
