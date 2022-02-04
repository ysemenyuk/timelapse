import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

export default (app) => {
  const router = express.Router();

  router.use(authMiddleware);

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      req.logger('task.routes get api/cameras/:id/tasks');
    })
  );

  router.post(
    '/',
    asyncHandler(async (req, res) => {
      req.logger('task.routes post api/cameras/:id/tasks');
    })
  );

  return router;
};
