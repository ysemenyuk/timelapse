import express from 'express';

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
    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
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
    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
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
    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
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
    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
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
    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
  })
);

router.get(
  '/:id/screenshot',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.get /:id/screenshot');

    const camera = await cameraController.getScreenshot({
      userId: req.userId,
      cameraId: req.params.id,
      logger: req.logger,
      bucket: req.bucket,
    });

    res.status(200).send(camera);
  })
);

export default router;
