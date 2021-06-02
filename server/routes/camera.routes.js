import express from 'express';
import asyncHandler from 'express-async-handler';

import cameraController from '../controllers/camera.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

console.log('cameraRouter');

const router = express.Router();

router.use(authMiddleware);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    console.log('- userRouter / req.user -', req.user);

    const cameras = await cameraController.getAll({ userId: req.user._id });
    res.status(201).send(cameras);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    console.log('- userRouter /:id req.user -', req.user);
    console.log('- userRouter /:id req.params -', req.params);

    const camera = await cameraController.getOne({
      userId: req.user._id,
      cameraId: req.params.id,
    });

    res.status(201).send(camera);
  })
);

router.post(
  '/',
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


// router.put('/:id', authMiddleware, CameraController.updateOne);

// router.delete('/:id', authMiddleware, CameraController.deleteOne);

export default router;
