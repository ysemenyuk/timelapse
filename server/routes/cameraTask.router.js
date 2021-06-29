import express from 'express';

import Task from '../models/task.js';

import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get(
  '/:id/tasks',
  asyncHandler(async (req, res) => {
    req.logger('task.routes get api/cameras/:id/tasks');

    const task = await Task.findOne({ camera: req.params.id });

    res.status(200).send(task);
  })
);

router.post(
  '/:id/tasks',
  asyncHandler(async (req, res) => {
    req.logger('task.routes post api/cameras/:id/tasks');

    console.log(req.body);

    const task = new Task({
      user: req.body.user,
      camera: req.body.camera,
      type: req.body.type,
      status: req.body.status,
      interval: req.body.interval,
      startTime: req.body.startTime,
      stopTime: req.body.stopTime,
    });

    await task.save();

    res.status(200).send(task);
  })
);

export default router;
