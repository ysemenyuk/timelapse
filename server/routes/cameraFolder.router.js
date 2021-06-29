import express from 'express';

import Folder from '../models/folder.js';

import authMiddleware from '../middleware/authMiddleware.js';
import userCameraMiddleware from '../middleware/userCameraMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);
router.use(userCameraMiddleware);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    req.logger('cameraFolderRouter.post api/cameras/:cameraId/folders');

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

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    req.logger(
      `cameraFolderRouter.get api/cameras/:cameraId/folders?parent=${req.query.parentId}`
    );

    // console.log('cameraFolderRouter req.params', req.params);
    // console.log('cameraFolderRouter req.query', req.query);

    const folders = await Folder.find({ parent: req.query.parentId });

    // console.log('cameraFolderRouter folders', folders);

    res.status(200).send(folders);

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.get(
  '/:folderId',
  asyncHandler(async (req, res) => {
    req.logger(`cameraFolderRouter.get api/cameras/:cameraId/folders/${req.params.folderId}`);

    // console.log('cameraFolderRouter req.params', req.params);
    // console.log('cameraFolderRouter req.query', req.query);

    const folder = await Folder.findOne({ _id: req.params.folderId });

    // console.log('cameraFolderRouter folder', folder);

    res.status(200).send(folder);

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

router.delete(
  '/:folderId',
  asyncHandler(async (req, res) => {
    req.logger(`cameraFolderRouter.delete api/cameras/:cameraId/folders/${req.params.folderId}`);

    // console.log('cameraFolderRouter req.params', req.params);
    // console.log('cameraFolderRouter req.query', req.query);

    await Folder.findOneAndDelete({ user: userId, camera: cameraId, _id: fileId });

    res.status(204).send();

    req.logger(
      `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
    );
  })
);

export default router;
