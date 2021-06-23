import express from 'express';
import axios from 'axios';
import sharp from 'sharp';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

import Camera from '../models/camera.js';
import File from '../models/file.js';
import Folder from '../models/folder.js';

import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

import cameraValidator from '../validators/camera.validators.ajv.js';
import cameraController from '../controllers/camera.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.get /');

    const cameras = await cameraController.getAll({ userId: req.userId, logger: req.logger });

    res.status(200).send(cameras);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.get /:id');

    const camera = await cameraController.getOne({
      userId: req.userId,
      cameraId: req.params.id,
      logger: req.logger,
    });

    res.status(200).send(camera);
  })
);

router.post(
  '/',
  cameraValidator.createOne,
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.post /');

    const camera = await cameraController.createOne({
      userId: req.userId,
      payload: req.body,
      logger: req.logger,
    });

    res.status(201).send(camera);
  })
);

router.put(
  '/:id',
  cameraValidator.updateOne,
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.put /:id');

    const camera = await cameraController.updateOne({
      userId: req.userId,
      cameraId: req.params.id,
      payload: req.body,
      logger: req.logger,
    });

    res.status(201).send(camera);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.delete /:id');

    await cameraController.deleteOne({
      userId: req.userId,
      cameraId: req.params.id,
      logger: req.logger,
    });

    res.status(204).send();
  })
);

router.get(
  '/:id/screenshot',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.get /:id/screenshot');

    const name = uuidv4();

    const fileName = `${name}.jpg`;
    const originalName = `${name}-orig.jpg`;
    const previewName = `${name}-prev.jpg`;

    const camera = await Camera.findOne({ _id: req.params.id });

    console.log(camera);

    const file = new File({
      user: req.userId,
      camera: req.params.id,
      name: fileName,
      original: originalName,
      preview: previewName,
      parent: camera.screenshotsFolder,
    });

    const { data } = await axios.get(camera.screenshotLink, { responseType: 'arraybuffer' });
    Readable.from(data).pipe(req.bucket.openUploadStream(originalName));

    const prev = await sharp(data).resize(200).toBuffer();
    Readable.from(prev).pipe(req.bucket.openUploadStream(previewName));

    file.save();

    res.status(200).send(file);
  })
);

router.get(
  '/:id/files',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.get /:id/files?paretnId=123456');

    const files = await File.find({ parent: req.query.parentId });

    res.status(200).send(files);
  })
);

router.get(
  '/:id/folders',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.get /:id/folders?paretnId=123456');

    const folders = await Folder.find({ parent: req.body.parentId });

    res.status(200).send(folders);
  })
);

router.post(
  '/:id/folders',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.post /:id/folders');

    console.log(req.body);

    const folder = new Folder({
      name: req.body.name,
      user: req.userId,
      camera: req.body.cameraId,
      parent: req.body.parentId,
    });

    await folder.save();

    res.status(200).send(folder);
  })
);

export default router;
