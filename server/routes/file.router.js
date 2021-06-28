import express from 'express';

import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';
import { getBucket } from '../dbConfig.js';

const router = express.Router();

router.get(
  '/:fileName',
  asyncHandler(async (req, res) => {
    const { fileName } = req.params;

    const bucket = getBucket();
    const downloadStream = bucket.openDownloadStreamByName(fileName);

    downloadStream
      .pipe(res)
      .on('error', () => res.sendStatus(404))
      .on('close', () =>
        req.logger.info(
          `RES: ${req.originalUrl} - ${res.statusCode} - ${Date.now() - req.t1} msec`
        )
      );
  })
);

router.post(
  '/',
  asyncHandler((req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No file.');
    }

    const file = req.files.file.data;
    const fileName = req.files.file.name;

    const bucket = getBucket();
    const uploadStream = bucket.openUploadStream(fileName);
    uploadStream.on('error', () => res.sendStatus(500));
    Readable.from(file).pipe(uploadStream);

    res.send(fileName);
    req.logger.info(`res: ${res.statusCode} - ${Date.now() - req.t1} msec`);
  })
);

export default router;
