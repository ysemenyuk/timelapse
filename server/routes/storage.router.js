import express from 'express';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';
import fileRepository from '../repositories/file.repository.js';
import imageService from '../services/image.service.js';
import * as consts from '../utils/constants.js';

export default (storage) => {
  const router = express.Router();

  router.get(
    '/:fileName',
    asyncHandler(async (req, res) => {
      req.logger(`storage.router.get /files/${req.params.fileName}`);

      const file = await fileRepository.getOneByName({
        name: req.params.fileName,
        logger: req.logger,
      });

      if (!file) {
        res.sendStatus(404);
        req.logResp(req);
        return;
      }

      const isThumbnail = req.query && req.query.size && req.query.size === 'thumbnail';

      const stream = storage.openDownloadStream({
        file,
        logger: req.logger,
      });

      if (isThumbnail) {
        stream.pipe(imageService.resize(consts.THUMBNAIL_SIZE)).pipe(res);
      } else {
        stream.pipe(res);
      }

      stream.on('error', (e) => {
        // console.log('stream.on error', e);
        res.sendStatus(500);
        req.logResp(req);
      });

      stream.on('end', () => {
        // console.log('stream.on end');
        req.logResp(req);
      });
    })
  );

  // router.post(
  //   '/',
  //   asyncHandler((req, res) => {
  //     if (!req.files || !req.files.file) {
  //       return res.status(400).send('No file.');
  //     }

  //     const file = req.files.file.data;
  //     const fileName = req.files.file.name;

  //     const uploadStream = storage.openUploadStream({ fileName, logger });

  //     Readable.from(file).pipe(uploadStream);

  //     uploadStream.on('error', () => res.sendStatus(500));

  //     uploadStream.on('finish', () => res.send(fileName));
  //   })
  // );

  return router;
};
