import express from 'express';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import debug from 'debug';
import path from 'path';
import mongoClient from './dbConfig.js';
import userRouter from './routes/user.router.js';
import cameraRouter from './routes/camera.router.js';
import fileRouter from './routes/file.router.js';
import taskRouter from './routes/task.router.js';
import debugMiddleware from './middleware/debugMiddleware.js';
// import winstonMiddleware from './middleware/winstonMiddleware.js';
import storageRouter from './routes/storage.router.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { Agenda } from 'agenda/es.js';

import __dirname from './dirname.js';
// console.log('__dirname', __dirname);

const assetsPath = path.join(__dirname, 'assets');
// console.log('assetsPath', assetsPath);

const mode = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 4000;
const dbUri = process.env.MONGO_URI;
const storageType = process.env.STORAGE_TYPE || 'gridfs';

const logger = debug('server');

logger(`mode ${mode}`);
logger(`storageType ${storageType}`);

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: { origin: '*' },
});

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
app.use('/api/cameras/:cameraId/files', fileRouter);
app.use('/api/cameras/:cameraId/tasks', taskRouter);
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
    // logger(`MongoClient successfully Connected`);

    // await mongoose.connect(dbUri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    // });

    // logger(`Mongoose successfully Connected`);

    // console.log(111, agenda)

    const agenda = new Agenda({ mongo: mongoClient.db('myFirstDatabase') });
    // const agenda = new Agenda({ db: { adress: dbUri, options: {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    //  } }});

    // agenda.processEvery("10 seconds");
    // agenda.lockLimit(1);

    agenda.define('console1', { lockLifetime: 10000 }, (job) => {
      console.log(111111, new Date().toISOString(), job.attrs);
    });

    // agenda.define("console2", { lockLifetime: 10000 }, (job) => {
    //   console.log(222222)
    // });

    // const job = agenda.create('console1', { cameraId: 1 });
    // job.repeatEvery('10 seconds');
    // await job.save();

    // const job2 = agenda.create('console1', { cameraId: 2 });
    // job2.repeatEvery('15 seconds');
    // await job2.save();

    // console.log("Job successfully saved");

    await agenda.start();

    const jobs = await agenda.jobs();
    console.log('Jobs', jobs);

    // await agenda.every("10 seconds", "console1", {cameraId: 1});
    // await agenda.every("15 seconds", "console1", {cameraId: 2});

    // await agenda.every("15 seconds", "console2");

    agenda
      .on('ready', () => console.log('Agenda started!'))
      .on('error', () => console.log('Agenda connection error!'));

    // agenda
    // .on("start", (job) => {
    //   console.log(`Job ${job.attrs.name} starting`);
    // })
    // .on("complete", (job) => {
    //   console.log(`Job ${job.attrs.name} finished`);
    // });

    // app.listen(PORT, logger(`Api server running in ${mode} mode on port ${PORT}`));
    // httpServer.listen(5000, logger(`Socket server running in ${mode} mode on port ${5000}`));
  } catch (e) {
    console.log('catch err', e);
  }
};

startServer();
