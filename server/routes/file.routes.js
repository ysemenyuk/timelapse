import express from 'express';

import fileController from '../controllers/file.controller.js';

const router = express.Router();

router.post('/', fileController.createFile);
router.post('/dir', fileController.createDir);

router.get('/', fileController.getFiles);
router.get('/:id', fileController.getFile);

router.delete('/:id', fileController.deleteOne);

export default router;
