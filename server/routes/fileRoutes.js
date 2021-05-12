import express from 'express';

import CameraController from '../controllers/cameraController.js';

const router = express.Router();

router.get('/', CameraController.getAll);
router.get('/:id', CameraController.getOne);
router.post('/', CameraController.createOne);
router.put('/:id', CameraController.updateOne);
router.delete('/:id', CameraController.deleteOne);

export default router;
