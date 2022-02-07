import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import userCameraMiddleware from '../middleware/userCameraMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';
// import createFileController from '../controllers/file.controller.js';

export default (fileController) => {
  const router = express.Router({ mergeParams: true });

  router.use(authMiddleware);
  router.use(userCameraMiddleware);

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      req.logger(`fileRouter.get api/cameras/:cameraId/files?parent=${req.query.parentId}`);

      const files = await fileController.getAll({
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
      req.logger(`fileRouter.get api/cameras/:cameraId/files/${req.params.fileId}`);

      const file = await fileController.getOne({
        id: req.params.fileId,
        logger: req.logger,
      });

      // console.log('cameraFileRouter file', file);

      res.status(200).send(file);
      req.logResp(req);
    })
  );

  router.post(
    '/',
    asyncHandler(async (req, res) => {
      req.logger('fileRouter.post api/cameras/:cameraId/files/folder');

      const folder = await fileController.createOne({
        userId: req.userId,
        cameraId: req.cameraId,
        payload: req.body,
        logger: req.logger,
      });

      res.status(201).send(folder);
      req.logResp(req);
    })
  );

  router.post(
    '/screenshot',
    asyncHandler(async (req, res) => {
      req.logger('fileRouter.post api/cameras/:cameraId/files/screenshot');

      // console.log('fileRouter screenshot req.body:', req.body);

      const screenshot = await fileController.createScreenshot({
        userId: req.userId,
        cameraId: req.cameraId,
        payload: req.body,
        logger: req.logger,
      });

      console.log('fileRouter screenshot screenshot:', screenshot);

      res.status(201).send(screenshot);
      req.logResp(req);
    })
  );

  router.delete(
    '/:fileId',
    asyncHandler(async (req, res) => {
      req.logger(`fileRouter.delete api/cameras/:cameraId/files/${req.params.fileId}`);

      await fileController.deleteOne({
        id: req.params.fileId,
        logger: req.logger,
      });

      res.status(204).send();
      req.logResp(req);
    })
  );

  return router;
};
