import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import userCameraMiddleware from '../middleware/userCameraMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

export default (taskController) => {
  const router = express.Router({ mergeParams: true });

  router.use(authMiddleware);
  router.use(userCameraMiddleware);

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      req.logger('task.routes get api/cameras/:cameraId/tasks');

      const tasks = await taskController.getAll({
        cameraId: req.params.cameraId,
        logger: req.logger,
      });

      // console.log('task.routes.getAll task', task);

      res.status(200).send(tasks);
      req.logResp(req);
    })
  );

  router.get(
    '/:taskId',
    asyncHandler(async (req, res) => {
      req.logger('task.routes get api/cameras/:cameraId/tasks/:taskId');

      const task = await taskController.getOne({
        id: req.params.taskId,
        logger: req.logger,
      });

      // console.log('task.routes.getOne task', task);

      res.status(200).send(task);
      req.logResp(req);
    })
  );

  router.post(
    '/',
    asyncHandler(async (req, res) => {
      req.logger('task.routes post api/cameras/:cameraId/tasks');

      const task = await taskController.createOne({
        userId: req.userId,
        cameraId: req.params.cameraId,
        payload: req.body,
        logger: req.logger,
      });

      res.status(201).send(task);
      req.logResp(req);
    })
  );

  router.put(
    '/:taskId',
    asyncHandler(async (req, res) => {
      req.logger('task.routes put api/cameras/:cameraId/tasks/:taskId');

      const task = await taskController.updateOne({
        id: req.params.taskId,
        payload: req.body,
        logger: req.logger,
      });

      res.status(201).send(task);
      req.logResp(req);
    })
  );

  router.delete(
    '/:taskId',
    asyncHandler(async (req, res) => {
      req.logger('task.routes delete api/cameras/:cameraId/tasks/:taskId');

      await taskController.deleteOne({
        id: req.params.taskId,
        logger: req.logger,
      });

      res.status(204).send();
      req.logResp(req);
    })
  );

  return router;
};
