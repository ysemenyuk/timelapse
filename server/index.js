import path from 'path';
import express from 'express';
import dotenv from 'dotenv'

import camerasRoutes from './routes.js';

dotenv.config()

const app = express();

app.use(express.json())

app.get('/api', (req, res) => {
  res.send('API is running....')
})

app.use('/api/cameras', camerasRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(path.resolve(), '/client/public')))
  app.get('/', (req, res) =>
    res.sendFile(path.resolve(path.resolve(), 'client', 'public', 'index.html'))
  )
}

const PORT = process.env.PORT || 4000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
