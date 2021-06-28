import express from 'express';

import cameraScreenshotController from '../controllers/cameraScreenshot.controller.js';

// import axios from 'axios';
// import sharp from 'sharp';
// import { Readable } from 'stream';
// import { v4 as uuidv4 } from 'uuid';

// import File from '../models/file.js';

import authMiddleware from '../middleware/authMiddleware.js';
import userCameraMiddleware from '../middleware/userCameraMiddleware.js';

import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware, userCameraMiddleware);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraScreenshotRouter GET api/cameras/:cameraId/screenshots');

    console.log(1111111111, 1111111111);

    const screenshot = await cameraScreenshotController.getScreenshot({
      userId: req.userId,
      cameraId: req.cameraId,
      logger: req.logger,
    });

    console.log('cameraScreenshotRouter screenshot:', screenshot);

    res.status(200).send(screenshot);

    console.log(22222222, 222222222);
  })
);

export default router;
