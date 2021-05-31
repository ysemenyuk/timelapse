import express from 'express';

import CameraController from '../controllers/camera.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

console.log('cameraRouter');

const router = express.Router();

router.get('/', authMiddleware, CameraController.getAll);
router.get('/:id', authMiddleware, CameraController.getOne);

router.post('/', authMiddleware, CameraController.createOne);

router.put('/:id', authMiddleware, CameraController.updateOne);

router.delete('/:id', authMiddleware, CameraController.deleteOne);

export default router;
