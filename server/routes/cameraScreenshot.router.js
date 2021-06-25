import express from 'express';

import cameraScreenshotController from '../controllers/cameraScreenshot.controller.js';

import axios from 'axios';
import sharp from 'sharp';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

import File from '../models/file.js';

import authMiddleware from '../middleware/authMiddleware.js';
import userCameraMiddleware from '../middleware/userCameraMiddleware.js';

import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware, userCameraMiddleware);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraScreenshotRouter GET api/cameras/:cameraId/screenshots');

    // const name = uuidv4();

    // const fileName = `${name}.jpg`;
    // const originalName = `${name}-orig.jpg`;
    // const previewName = `${name}-prev.jpg`;

    // const camera = await Camera.findOne({ _id: req.params.id });

    // console.log('cameraScreenshotRouter camera', camera);

    // const { data } = await axios.get(camera.screenshotLink, { responseType: 'arraybuffer' });
    // Readable.from(data).pipe(req.bucket.openUploadStream(originalName));

    // const prev = await sharp(data).resize(200).toBuffer();
    // Readable.from(prev).pipe(req.bucket.openUploadStream(previewName));

    // const file = new File({
    //   user: req.userId,
    //   camera: req.params.id,
    //   name: fileName,
    //   original: originalName,
    //   preview: previewName,
    //   parent: camera.screenshotsFolder,
    // });

    // file.save();

    const scrennshot = cameraScreenshotController.getScreenshot({
      userId: req.userId,
      cameraId: req.cameraId,
      logger: req.logger,
    });

    console.log('cameraScreenshotRouter scrennshot', scrennshot);

    res.status(200).send(scrennshot);
  })
);

export default router;
