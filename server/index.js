import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

import userRoutes from './routes/user.routes.js';
import cameraRoutes from './routes/camera.routes.js';

import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware.js';

import __dirname from './initDirname.js';

console.log('- index __dirname -', __dirname);
console.log('- index path.resolve() -', path.resolve());

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/files/assets', express.static(path.join(__dirname, 'assets')));
app.use('/files', express.static(path.join(__dirname, '..', 'cameras')));

app.use('/api/user', userRoutes);
app.use('/api/cameras', cameraRoutes);

app.get('/', (req, res) => {
  res.send('API is running....');
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
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    app.listen(
      PORT,
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      )
    );
  } catch (e) {
    console.log(e);
  }
};

start();
