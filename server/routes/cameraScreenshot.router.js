import express from 'express';

import cameraScreenshotController from '../controllers/cameraScreenshot.controller.js';

import authMiddleware from '../middleware/authMiddleware.js';
import userCameraMiddleware from '../middleware/userCameraMiddleware.js';

import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);
router.use(userCameraMiddleware);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    req.logger('cameraScreenshotRouter.post api/cameras/:cameraId/screenshots');

    const screenshot = await cameraScreenshotController.createScreenshot({
      userId: req.userId,
      cameraId: req.cameraId,
      logger: req.logger,
    });

    // console.log('cameraScreenshotRouter screenshot:', screenshot);

    res.status(201).send(screenshot);

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

export default router;
