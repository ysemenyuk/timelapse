import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import userCameraMiddleware from '../middleware/userCameraMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';
// import createFileController from '../controllers/file.controller.js';

export default (fileController) => {
  const router = express.Router({ mergeParams: true });

  router.use(authMiddleware);
  router.use(userCameraMiddleware);

  router.get('/', asyncHandler(fileController.getAll));
  router.get('/:fileId', asyncHandler(fileController.getOne));

  router.post('/', asyncHandler(fileController.createOne));

  router.delete('/:fileId', asyncHandler(fileController.deleteOne));

  return router;
};
