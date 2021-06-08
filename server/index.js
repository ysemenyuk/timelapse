import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

import logger from './libs/logger.js';
import userRoutes from './routes/user.routes.js';
import cameraRoutes from './routes/camera.routes.js';

import loggerMiddleware from './middleware/loggerMiddleware.js';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';

import __dirname from './dirname.js';

logger.info('__dirname', { __dirname });

// console.log('- index __dirname -', __dirname);
// console.log('- index path.resolve() -', path.resolve());

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(loggerMiddleware);
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

const start = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);

    app.listen(
      PORT,
      // console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
      logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
