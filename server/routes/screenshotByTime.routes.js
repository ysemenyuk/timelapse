import express from 'express';

import ScreenshotByTime from '../models/screenshotByTime.js';

// import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router();

// router.use(authMiddleware);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    req.logger.info('screenshotByTime.routes get /?cameraId=111');

    const screenshotsData = await ScreenshotByTime.findOne({ camera: req.query.cameraId });

    res.status(200).send(screenshotsData);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    req.logger.info('screenshotByTime.routes post /');

    console.log(req.body);

    const screenshotsData = new ScreenshotByTime({
      user: req.body.user,
      camera: req.body.camera,
      status: 'stopped',
      interval: '60',
      startTime: '10-00',
      stopTime: '20-00',
    });

    await screenshotsData.save();

    res.status(200).send(screenshotsData);
  })
);

export default router;
