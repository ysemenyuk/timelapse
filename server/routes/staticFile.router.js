import express from 'express';

import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';
import staticFileRepo from '../repositories/staticFile.repository.js';

const router = express.Router();

router.get(
  '/:fileName',
  asyncHandler(async (req, res) => {
    const { fileName } = req.params;

    const downloadStream = staticFileRepo.openDownloadStreamByName(fileName);

    downloadStream
      .pipe(res)
      .on('error', () => res.sendStatus(404))
      .on('close', () =>
        req.logger(
          `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
        )
      );
  })
);

// router.post(
//   '/',
//   asyncHandler((req, res) => {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).send('No file.');
//     }

//     const file = req.files.file.data;
//     const fileName = req.files.file.name;

//     const bucket = getBucket();
//     const uploadStream = bucket.openUploadStream(fileName);
//     uploadStream.on('error', () => res.sendStatus(500));
//     Readable.from(file).pipe(uploadStream);

//     res.send(fileName);
//     req.logger(`res: ${res.statusCode} - ${Date.now() - req.t1} msec`);
//   })
// );

export default router;
