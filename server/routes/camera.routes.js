import express from 'express';
import asyncHandler from 'express-async-handler';

import authMiddleware from '../middleware/authMiddleware.js';
import cameraValidator from '../validators/camera.validators.validator.js';
import cameraController from '../controllers/camera.controller.js';

console.log('cameraRouter');

const router = express.Router();

router.use(authMiddleware);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    console.log('- userRouter / req.user -', req.user);

    const cameras = await cameraController.getAll({ userId: req.user._id });
    res.status(200).send(cameras);
  })
);

router.get(
  '/:id',
  cameraValidator.getOne,
  asyncHandler(async (req, res) => {
    console.log('- userRouter /:id req.user -', req.user);
    console.log('- userRouter /:id req.params -', req.params);

    const camera = await cameraController.getOne({
      userId: req.user._id,
      cameraId: req.params.id,
    });

    res.status(200).send(camera);
  })
);

router.post(
  '/',
  cameraValidator.createOne,
  asyncHandler(async (req, res) => {
    console.log('- userRouter post / req.user -', req.user);
    console.log('- userRouter post / req.body -', req.body);

    const camera = await cameraController.createOne({
      userId: req.user._id,
      payload: req.body,
    });

    res.status(201).send(camera);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    console.log('- userRouter put /:id req.user -', req.user);
    console.log('- userRouter put /:id req.params -', req.params);
    console.log('- userRouter put /:id req.body -', req.body);

    const camera = await cameraController.updateOne({
      userId: req.user._id,
      cameraId: req.params.id,
      payload: req.body,
    });

    res.status(201).send(camera);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    // console.log('- userRouter delete /:id req.user -', req.user);
    // console.log('- userRouter delete /:id req.params -', req.params);

    await cameraController.deleteOne({
      userId: req.user._id,
      cameraId: req.params.id,
    });

    return res.status(204).send();
  })
);

export default router;
