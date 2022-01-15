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

    const files = await cameraFileController.getAll({
      userId: req.userId,
      cameraId: req.cameraId,
      parentId: req.query.parentId,
      logger: req.logger,
    });

    // console.log('cameraFileRouter files', files);

    res.status(200).send(files);
    req.logResp(req);
  })
);

router.get(
  '/:fileId',
  asyncHandler(async (req, res) => {
    req.logger(`cameraFileRouter.get api/cameras/:cameraId/files/${req.params.fileId}`);

    const file = await cameraFileController.getOne({
      userId: req.userId,
      cameraId: req.cameraId,
      fileId: req.params.fileId,
      logger: req.logger,
    });

    // console.log('cameraFileRouter file', file);

    res.status(200).send(file);
    req.logResp(req);
  })
);

router.delete(
  '/:fileId',
  asyncHandler(async (req, res) => {
    req.logger(`cameraFileRouter.delete api/cameras/:cameraId/files/${req.params.fileId}`);

    await cameraFileController.deleteOne({
      userId: req.userId,
      cameraId: req.cameraId,
      fileId: req.params.fileId,
      logger: req.logger,
    });

    res.status(204).send();
    req.logResp(req);
  })
);

export default router;
