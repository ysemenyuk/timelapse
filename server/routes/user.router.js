import Router from 'express';

import User from '../models/User.js';

import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

import userValidator from '../validators/user.validators.ajv.js';
import userController from '../controllers/user.controller.js';

const router = new Router();

router.post(
  '/singup',
  userValidator.singUp,
  asyncHandler(async (req, res) => {
    req.logger('userRouter.post /api/user/singup');

    const { token, user } = await userController.singUp({ payload: req.body, logger: req.logger });
    res.status(201).send({ token, user });

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.post(
  '/login',
  userValidator.logIn,
  asyncHandler(async (req, res) => {
    req.logger('userRouter.post /api/user/login');

    const { token, user } = await userController.logIn({ payload: req.body, logger: req.logger });
    res.status(200).send({ token, user });

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.get(
  '/auth',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger('userRouter.get /api/user/auth');

    const { token, user } = await userController.auth({ userId: req.userId, logger: req.logger });

    res.status(200).send({ token, user });

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.post(
  '/:userId/avatar',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger(`userRouter.post api/user/${req.params.userId}/avatar`);

    console.log(1, req.files);

    if (!req.files || !req.files.avatar) {
      return res.status(400).send('No file.');
    }

    const { user } = await userController.uploadAvatar({
      userId: req.userId,
      file: req.files.avatar,
      logger: req.logger,
    });

    res.status(200).send({ user });

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.delete(
  '/:userId/avatar',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger('userRouter.delete api/user/:userId/avatar');

    const { user } = await userController.deleteAvatar({
      userId: req.userId,
      logger: req.logger,
    });

    res.send({ user });

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.get(
  '/:userId',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger('userRouter.get /:id');

    const { user } = await userController.getOne({ userId: req.userId, logger: req.logger });

    res.status(200).send({ user });

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
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

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.delete(
  '/:userId',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger('userRouter.delete /:id');

    await userController.deleteOne({ userId: req.userId, logger: req.logger });

    res.status(204).send();

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

export default router;
