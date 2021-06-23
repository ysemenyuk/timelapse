import express from 'express';

import File from '../models/file.js';

import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router();

// router.use(authMiddleware);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    req.logger.info('fileRouter.get /');

    const files = await File.find({ parent: req.query.parentId });

    res.status(200).send(files);
  })
);

export default router;
