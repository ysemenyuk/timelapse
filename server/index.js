import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';

import cameraRoutes from './routes/cameraRoutes.js';
import { errorHandler } from './middleware/errorHandlerMiddleware.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

console.log('__filename - ', __filename);
console.log('__dirname - ', __dirname);
console.log('path.resolve() - ', path.resolve());

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use('/api/cameras', cameraRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'public')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve('client', 'public', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(errorHandler);

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
