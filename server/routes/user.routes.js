import Router from 'express';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/user.js';
import { getBucket } from '../dbConfig.js';

import authMiddleware from '../middleware/authMiddleware.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';

import userValidator from '../validators/user.validators.ajv.js';
import userController from '../controllers/user.controller.js';

const router = new Router();

router.post(
  '/singup',
  userValidator.singUp,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.post /singup');

    const { token, user } = await userController.singUp({ payload: req.body, logger: req.logger });
    res.status(201).send({ token, user });
  })
);

router.post(
  '/login',
  userValidator.logIn,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.post /login');

    const { token, user } = await userController.logIn({ payload: req.body, logger: req.logger });
    res.status(200).send({ token, user });
  })
);

router.get(
  '/auth',
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { token, user } = await userController.auth({ userId: req.userId, logger: req.logger });
    res.status(200).send({ token, user });
  })
);

router.post(
  '/avatar',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.post /avatar');

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No file.');
    }

    // check file type

    const fileData = req.files.avatar.data;
    const fileName = `${uuidv4()}.jpg`;

    const bucket = getBucket();
    const uploadStream = bucket.openUploadStream(fileName, { metadata });

    Readable.from(fileData).pipe(uploadStream);

    uploadStream.on('error', () => {
      // console.log('error streem');
      res.sendStatus(500);
    });

    uploadStream.on('close', async () => {
      // console.log('close streem');
      const file = new File({
        user: req.userId,
        name: fileName,
        original: fileName,
      });

      await file.save();

      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { avatar: fileName },
        { new: true }
      );

      res.status(201).send(user);
    });
  })
);

router.delete(
  '/avatar',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.delete /avatar');

    const user = await User.findOneAndUpdate(
      { _id: req.userId },
      { avatar: 'no_img.jpg' },
      { new: true }
    );

    // File.findByIdAndDelete();

    // delete file fom gridfs

    res.send(user);
  })
);

router.get(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.get /:id');

    const { user } = await userController.getOne({ userId: req.userId, logger: req.logger });
    res.status(200).send({ user });
  })
);

router.put(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.put /:id');

    const { user } = await userController.updateOne({
      userId: req.userId,
      payload: req.body,
      logger: req.logger,
    });

    res.status(201).send(user);
  })
);

router.delete(
  '/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    req.logger.info('userRouter.delete /:id');

    await userController.deleteOne({ userId: req.userId, logger: req.logger });
    res.status(204).send();
  })
);

export default router;
