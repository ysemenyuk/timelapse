import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';
import userValidator from '../validators/user.validators.ajv.js';
// import userController from '../controllers/user.controller.js';

export default (userController) => {
  const router = express.Router();

  router.post(
    '/singup',
    userValidator.singUp,
    asyncHandler(async (req, res) => {
      req.logger('userRouter.post /api/user/singup');

      const { token, user } = await userController.singUp({ payload: req.body, logger: req.logger });
      res.status(201).send({ token, user });
      req.logResp(req);
    })
  );

  router.post(
    '/login',
    userValidator.logIn,
    asyncHandler(async (req, res) => {
      req.logger('userRouter.post /api/user/login');

      console.log(1111, req.body);

      const { token, user } = await userController.logIn({ payload: req.body, logger: req.logger });
      res.status(200).send({ token, user });
      req.logResp(req);
    })
  );

  router.get(
    '/auth',
    authMiddleware,
    asyncHandler(async (req, res) => {
      req.logger('userRouter.get /api/user/auth');

      const { token, user } = await userController.auth({ userId: req.userId, logger: req.logger });

      res.status(200).send({ token, user });
      req.logResp(req);
    })
  );

  router.get(
    '/:userId',
    authMiddleware,
    asyncHandler(async (req, res) => {
      req.logger('userRouter.get /:id');

      const { user } = await userController.getOne({ userId: req.userId, logger: req.logger });

      res.status(200).send({ user });
      req.logResp(req);
    })
  );

  router.put(
    '/:userId',
    authMiddleware,
    asyncHandler(async (req, res) => {
      req.logger('userRouter.put /:id');

      const { user } = await userController.updateOne({
        userId: req.userId,
        payload: req.body,
        logger: req.logger,
      });

      res.status(201).send({ user });
      req.logResp(req);
    })
  );

  router.delete(
    '/:userId',
    authMiddleware,
    asyncHandler(async (req, res) => {
      req.logger('userRouter.delete /:id');

      await userController.deleteOne({ userId: req.userId, logger: req.logger });

      res.status(204).send();
      req.logResp(req);
    })
  );

  return router;
};
