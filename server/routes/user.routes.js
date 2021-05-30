import Router from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import userController from '../controllers/user.controller.js';

const router = new Router();

router.post('/singup', userController.singup);

router.post('/login', userController.login);

router.get('/auth', authMiddleware, userController.auth);

export default router;
