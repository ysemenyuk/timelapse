import express from 'express';

import cameraFileController from '../controllers/cameraFile.controller.js';

import authMiddleware from '../middleware/authMiddleware.js';
import userCameraMiddleware from '../middleware/userCameraMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);
router.use(userCameraMiddleware);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    req.logger(`cameraFileRouter.get api/cameras/:cameraId/files?parent=${req.query.parentId}`);

    // console.log('cameraFileRouter req.params', req.params);
    // console.log('cameraFileRouter req.query', req.query);
    // console.log('cameraFileRouter req.cameraId', req.cameraId);

    const files = await cameraFileController.getAll({
      userId: req.userId,
      cameraId: req.cameraId,
      query: req.query,
      logger: req.logger,
    });

    // console.log('cameraFileRouter files', files);

    res.status(200).send(files);

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.get(
  '/:fileId',
  asyncHandler(async (req, res) => {
    req.logger(`cameraFileRouter.get api/cameras/:cameraId/files/${req.params.fileId}`);

    // console.log('cameraFileRouter req.params', req.params);
    // console.log('cameraFileRouter req.query', req.query);
    // console.log('cameraFileRouter req.cameraId', req.cameraId);

    const file = await cameraFileController.getOne({
      userId: req.userId,
      cameraId: req.cameraId,
      fileId: req.params.fileId,
      logger: req.logger,
    });

    // console.log('cameraFileRouter file', file);

    res.status(200).send(file);

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.delete(
  '/:fileId',
  asyncHandler(async (req, res) => {
    req.logger(`cameraFileRouter.delete api/cameras/:cameraId/files/${req.params.fileId}`);

    // console.log('cameraFileRouter req.params', req.params);

    await cameraFileController.deleteOne({
      userId: req.userId,
      cameraId: req.cameraId,
      fileId: req.params.fileId,
      logger: req.logger,
    });

    res.status(204).send();

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

export default router;
