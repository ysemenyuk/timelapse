import express from 'express';

import Folder from '../models/folder.js';

// import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router();

// router.use(authMiddleware);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    req.logger.info('folderRouter.get /');

    console.log(req.query);

    const folders = await Folder.find({ parent: req.body.parentId });

    res.status(200).send(folders);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    req.logger.info('folderRouter.post /');

    console.log(req.body);

    const folder = new Folder({
      name: req.body.name,
      user: req.userId,
      camera: req.body.cameraId,
      parent: req.body.parentId,
    });

    await folder.save();

    res.status(200).send(folder);
  })
);

export default router;
