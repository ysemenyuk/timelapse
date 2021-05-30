import Router from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import userController from '../controllers/user.controller.js';

const router = new Router();

router.post('/singup', userController.singup);

router.post('/login', userController.login);

router.get('/auth', authMiddleware, userController.auth);

router.get('/:id', authMiddleware, userController.getOne);
router.put('/:id', authMiddleware, userController.updateOne);
router.delete('/:id', authMiddleware, userController.deleteOne);

export default router;
