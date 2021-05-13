import express from 'express';

import fileController from '../controllers/fileController.js';

const router = express.Router();

router.post('/', fileController.createOne);

router.get('/', fileController.getMany);
router.get('/:id', fileController.getOne);

export default router;
