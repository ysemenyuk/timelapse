import express from 'express';
import asyncHandler from 'express-async-handler';

import authMiddleware from '../middleware/authMiddleware.js';
import cameraValidator from '../validators/camera.validators.ajv.js';
import cameraController from '../controllers/camera.controller.js';

// console.log('cameraRouter');

const router = express.Router();

router.use(authMiddleware);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraRouter GET: /');
    const cameras = await cameraController.getAll({ userId: req.userId, logger: req.logger });
    res.status(200).send(cameras);
    req.logger.info(
      `res GET: / - ${res.statusCode} ${res.statusMessage} - ${Date.now() - req.start} ms`
    );
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const camera = await cameraController.getOne({
      userId: req.userId,
      cameraId: req.params.id,
    });

    res.status(200).send(camera);
  })
);

router.post(
  '/',
  cameraValidator.createOne,
  asyncHandler(async (req, res) => {
    const camera = await cameraController.createOne({
      userId: req.userId,
      payload: req.body,
    });

    res.status(201).send(camera);
  })
);

router.put(
  '/:id',
  cameraValidator.updateOne,
  asyncHandler(async (req, res) => {
    const camera = await cameraController.updateOne({
      userId: req.userId,
      cameraId: req.params.id,
      payload: req.body,
    });

    res.status(201).send(camera);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    await cameraController.deleteOne({
      userId: req.userId,
      cameraId: req.params.id,
    });

    return res.status(204).send();
  })
);

export default router;
