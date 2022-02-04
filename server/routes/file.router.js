import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import userCameraMiddleware from '../middleware/userCameraMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';
import createFileController from '../controllers/file.controller.js';

export default (app) => {
  const router = express.Router({ mergeParams: true });
  const fileController = createFileController(app);

  router.use(authMiddleware);
  router.use(userCameraMiddleware);

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      req.logger(`fileRouter.get api/cameras/:cameraId/files?parent=${req.query.parentId}`);

      const files = await fileController.getAll({
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
    '/:id',
    asyncHandler(async (req, res) => {
      req.logger(`fileRouter.get api/cameras/:cameraId/files/${req.params.id}`);

      const file = await fileController.getOne({
        userId: req.userId,
        cameraId: req.cameraId,
        id: req.params.id,
        logger: req.logger,
      });

      // console.log('cameraFileRouter file', file);

      res.status(200).send(file);
      req.logResp(req);
    })
  );

  router.post(
    '/folder',
    asyncHandler(async (req, res) => {
      req.logger('fileRouter.post api/cameras/:cameraId/files/folder');

      const folder = await fileController.createFolder({
        userId: req.userId,
        cameraId: req.cameraId,
        name: req.body.name,
        logger: req.logger,
      });

      // console.log('fileRouter folder:', folder);

      res.status(201).send(folder);
      req.logResp(req);
    })
  );

  router.post(
    '/screenshot',
    asyncHandler(async (req, res) => {
      req.logger('fileRouter.post api/cameras/:cameraId/files/screenshot');

      console.log('fileRouter screenshot req.body:', req.body);

      const screenshot = await fileController.createScreenshot({
        userId: req.userId,
        cameraId: req.cameraId,
        parentId: req.body.parentId,
        logger: req.logger,
      });

      console.log('fileRouter screenshot screenshot:', screenshot);

      res.status(201).send(screenshot);
      req.logResp(req);
    })
  );

  router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
      req.logger(`fileRouter.delete api/cameras/:cameraId/files/${req.params.id}`);

      await fileController.deleteOne({
        userId: req.userId,
        cameraId: req.cameraId,
        id: req.params.id,
        logger: req.logger,
      });

      res.status(204).send();
      req.logResp(req);
    })
  );

  return router;
};
