import express from 'express';

import fileController from '../controllers/fileController.js';

const router = express.Router();

router.post('/dir', fileController.createDir);
router.post('/file', fileController.createDir);

router.get('/', fileController.getFiles);
router.get('/:id', fileController.getFile);

export default router;
