import express from 'express';

// import Task from '../models/task.js';

import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get(
  '/:id/tasks',
  asyncHandler(async (req, res) => {
    req.logger('task.routes get api/cameras/:id/tasks');
  })
);

router.post(
  '/:id/tasks',
  asyncHandler(async (req, res) => {
    req.logger('task.routes post api/cameras/:id/tasks');
  })
);

export default router;
