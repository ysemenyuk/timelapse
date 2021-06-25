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
    req.logger.info('cameraRouter GET /');

    const cameras = await cameraController.getAll({ userId: req.userId, logger: req.logger });

    res.status(200).send(cameras);
  })
);

router.get(
  '/:cameraId',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.get /:cameraId');

    const camera = await cameraController.getOne({
      userId: req.userId,
      cameraId: req.params.cameraId,
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
  '/:cameraId',
  cameraValidator.updateOne,
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.put /:cameraId');

    const camera = await cameraController.updateOne({
      userId: req.userId,
      cameraId: req.params.cameraId,
      payload: req.body,
      logger: req.logger,
    });

    res.status(201).send(camera);
  })
);

router.delete(
  '/:cameraId',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter.delete /:cameraId');

    await cameraController.deleteOne({
      userId: req.userId,
      cameraId: req.params.cameraId,
      logger: req.logger,
    });

    res.status(204).send();
  })
);

export default router;
