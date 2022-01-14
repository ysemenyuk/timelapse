import Router from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';
import userFileController from '../controllers/userFile.controller.js';

const router = new Router();

router.post(
  '/avatar',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger(`userRouter.post api/user/${req.params.userId}/avatar`);
    // console.log(`userRouter.post api/user/${req.params.userId}/avatar`, req.files);

    if (!req.files || !req.files.avatar) {
      return res.status(400).send('No file.');
    }

    const { user } = await userFileController.uploadAvatar({
      userId: req.userId,
      file: req.files.avatar,
      logger: req.logger,
    });

    res.status(200).send({ user });
    req.logResp(req);
  })
);

router.delete(
  '/avatar',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger('userRouter.delete api/user/:userId/avatar');

    const { user } = await userFileController.deleteAvatar({
      userId: req.userId,
      logger: req.logger,
    });

    res.send({ user });
    req.logResp(req);
  })
);

export default router;
