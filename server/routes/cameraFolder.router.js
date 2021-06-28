import express from 'express';

import Folder from '../models/folder.js';

import authMiddleware from '../middleware/authMiddleware.js';
import userCameraMiddleware from '../middleware/userCameraMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware, userCameraMiddleware);

router.get(
  '/:folderId',
  asyncHandler(async (req, res) => {
    req.logger.info(`cameraFolderRouter GET api/cameras/:cameraId/folders/${req.params.folderId}`);

    console.log('cameraFolderRouter req.params', req.params);
    console.log('cameraFolderRouter req.query', req.query);

    const folder = await Folder.findOne({ _id: req.params.folderId });

    console.log('cameraFolderRouter folder', folder);

    res.status(200).send(folder);
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    req.logger.info(
      `cameraFolderRouter GET api/cameras/:cameraId/folders?parent=${req.query.parentId}`
    );

    // console.log('cameraFolderRouter req.params', req.params);
    // console.log('cameraFolderRouter req.query', req.query);

    const folders = await Folder.find({ parent: req.query.parentId });

    // console.log('cameraFolderRouter folders', folders);

    res.status(200).send(folders);

    req.logger.info(`RES: ${req.originalUrl} - ${res.statusCode} - ${Date.now() - req.t1} msec`);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    req.logger.info('cameraFolderRouter POST api/cameras/:cameraId/folders');

    // console.log('cameraFolderRouter req.params', req.params);
    // console.log('cameraFolderRouter req.query', req.query);
    // console.log('cameraFolderRouter req.body', req.body);

    const folder = new Folder({
      name: req.body.name,
      user: req.userId,
      camera: req.body.cameraId,
      parent: req.body.parentId,
    });

    await folder.save();

    // console.log('cameraFolderRouter folder', folder);

    res.status(200).send(folder);

    const t2 = Date.now();
    req.logger.info(`res: ${res.statusCode} - ${t2 - req.t1} msec`);
  })
);

export default router;
