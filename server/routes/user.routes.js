import Router from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

import userValidator from '../validators/user.validators.ajv.js';
import userController from '../controllers/user.controller.js';

const router = new Router();

router.post(
  '/singup',
  userValidator.singUp,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.post /singup');

    const { token, user } = await userController.singUp({ payload: req.body, logger: req.logger });
    res.status(201).send({ token, user });

    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
  })
);

router.post(
  '/login',
  userValidator.logIn,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.post /login');

    const { token, user } = await userController.logIn({ payload: req.body, logger: req.logger });
    res.status(200).send({ token, user });

    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
    req.logger.info(res);
  })
);

router.get(
  '/auth',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { token, user } = await userController.auth({ userId: req.userId, logger: req.logger });
    res.status(200).send({ token, user });

    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
  })
);

router.get(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.get /:id');

    const { user } = await userController.getOne({ userId: req.userId, logger: req.logger });
    res.status(200).send({ user });

    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
  })
);

router.put(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.put /:id');

    const { user } = await userController.updateOne({
      userId: req.userId,
      payload: req.body,
      logger: req.logger,
    });

    res.status(201).send({ user });

    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
  })
);

router.delete(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.delete /:id');

    await userController.deleteOne({ userId: req.userId, logger: req.logger });
    res.status(204).send();

    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
  })
);

router.post(
  '/:id/avatar',
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.post /:id/avatar');

    res.status(200).send('ok');

    req.logger.info(
      `res: ${req.method} - ${req.originalUrl} - ${res.statusCode} - ${res.statusMessage}`
    );
  })
);

router.delete('/:id/avatar');

export default router;
