import Router from 'express';
// import asyncHandler from 'express-async-handler';

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

router.get('/:id', authMiddleware, userController.getOne);
router.put('/:id', authMiddleware, userController.updateOne);
router.delete('/:id', authMiddleware, userController.deleteOne);

export default router;
