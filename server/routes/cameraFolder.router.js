import express from 'express';

import CameraFolder from '../models/CameraFolder.js';

import cameraFolderController from '../controllers/cameraFolder.controller.js';

import authMiddleware from '../middleware/authMiddleware.js';
import userCameraMiddleware from '../middleware/userCameraMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);
router.use(userCameraMiddleware);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    req.logger('cameraFolderRouter.post api/cameras/:cameraId/folders');

    const folder = new CameraFolder({
      name: req.body.name,
      user: req.userId,
      camera: req.cameraId,
      parent: req.body.parentId,
    });

    await folder.save();

    res.status(200).send(folder);

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    req.logger(
      `cameraFolderRouter.get api/cameras/:cameraId/folders?parent=${req.query.parentId}`
    );

    const folders = await cameraFolderController.getAll({
      userId: req.userId,
      cameraId: req.cameraId,
      parentId: req.query.parentId,
      logger: req.logger,
    });

    res.status(200).send(folders);

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.get(
  '/:folderId',
  asyncHandler(async (req, res) => {
    req.logger(`cameraFolderRouter.get api/cameras/:cameraId/folders/${req.params.folderId}`);

    const folder = await cameraFolderController.getOne({
      userId: req.userId,
      cameraId: req.cameraId,
      folderId: req.params.folderId,
      logger: req.logger,
    });

    res.status(200).send(folder);

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.delete(
  '/:folderId',
  asyncHandler(async (req, res) => {
    req.logger(`cameraFolderRouter.delete api/cameras/:cameraId/folders/${req.params.folderId}`);

    await cameraFolderController.deleteOne({
      userId: req.userId,
      cameraId: req.cameraId,
      folderId: req.params.folderId,
      logger: req.logger,
    });

    res.status(204).send();

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

export default router;
