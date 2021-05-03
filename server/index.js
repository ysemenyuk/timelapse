import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import camRoutes from './routes/cameraRoutes.js';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('API is running....');
});

app.use('/api/cameras', camRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(path.resolve(), '/client/public')));
  app.get('/', (req, res) => res.sendFile(path.resolve(path.resolve(), 'client', 'public', 'index.html')));
}

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
