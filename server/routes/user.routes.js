import Router from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import userValidator from '../validators/user.validators.ajv.js';
import userController from '../controllers/user.controller.js';

import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = new Router();

router.post(
  '/singup',
  userValidator.singUp,
  asyncHandler(async (req, res) => {
    await userController.singUp({ payload: req.body });
    res.status(201).send({ message: 'User was created' });
  })
);

router.post(
  '/login',
  userValidator.logIn,
  asyncHandler(async (req, res) => {
    const { token, user } = await userController.logIn({ payload: req.body });
    res.status(200).send({ token, user });
  })
);

router.get(
  '/auth',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { token, user } = await userController.auth({ userId: req.userId });
    res.status(200).send({ token, user });
  })
);

router.get(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { user } = await userController.getOne({ userId: req.userId });
    res.status(200).send({ user });
  })
);

router.put(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { user } = await userController.updateOne({
      userId: req.userId,
      payload: req.body,
    });

    res.status(201).send({ user });
  })
);

router.delete(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    await userController.deleteOne({ userId: req.userId });
    return res.status(204).send();
  })
);

router.post('/:id/avatar');
router.delete('/:id/avatar');

export default router;
