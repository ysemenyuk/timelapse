import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import cameraValidator from '../validators/camera.validators.ajv.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';
import createCameraController from '../controllers/camera.controller.js';

export default (app) => {
  const router = express.Router({ mergeParams: true });
  const cameraController = createCameraController(app);

  router.use(authMiddleware);

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      req.logger('cameraRouter GET /api/cameras/');

      const cameras = await cameraController.getAll({
        userId: req.userId,
        logger: req.logger,
      });

      res.status(200).send(cameras);
      req.logResp(req);
    })
  );

  router.get(
    '/:cameraId',
    asyncHandler(async (req, res) => {
      req.logger(`cameraRouter.get /api/cameras/${req.params.cameraId}`);

      const camera = await cameraController.getOne({
        userId: req.userId,
        cameraId: req.params.cameraId,
        logger: req.logger,
      });

      res.status(200).send(camera);
      req.logResp(req);
    })
  );

  router.post(
    '/',
    cameraValidator.createOne,
    asyncHandler(async (req, res) => {
      req.logger('cameraRouter.post /api/cameras');

      console.log(1111, req.body);

      const camera = await cameraController.createOne({
        userId: req.userId,
        payload: req.body,
        logger: req.logger,
      });

      res.status(201).send(camera);
      req.logResp(req);
    })
  );

  router.put(
    '/:cameraId',
    cameraValidator.updateOne,
    asyncHandler(async (req, res) => {
      req.logger('cameraRouter.put /:cameraId');

      const camera = await cameraController.updateOne({
        userId: req.userId,
        cameraId: req.params.cameraId,
        payload: req.body,
        logger: req.logger,
      });

      res.status(201).send(camera);
      req.logResp(req);
    })
  );

  router.delete(
    '/:cameraId',
    asyncHandler(async (req, res) => {
      req.logger('cameraRouter.delete /:cameraId');

      await cameraController.deleteOne({
        userId: req.userId,
        cameraId: req.params.cameraId,
        logger: req.logger,
      });

      res.status(204).send();
      req.logResp(req);
    })
  );

  return router;
};
