import express from 'express';

import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';
import staticFileRepo from '../repositories/staticFile.repository.js';
import cameraFileRepo from '../repositories/cameraFile.repository.js';

const router = express.Router();

router.get(
  '/:fileName',
  asyncHandler(async (req, res) => {
    req.logger(`staticFileRouter.get /files/${req.params.fileName}`);

    // find file in cameraFiles
    // if not res 404
    // else return fileId
    // downloadStream by fileId

    const downloadStream = staticFileRepo.openDownloadStreamByName({
      fileName: req.params.fileName,
      logger: req.logger,
    });

    downloadStream.pipe(res);

    downloadStream.on('error', () => {
      res.sendStatus(404);
      req.logger(
        `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
      );
    });

    downloadStream.on('end', () => {
      // console.log('end');
      req.logger(
        `RES: ${req.method}-${req.originalUrl} -${res.statusCode} -${Date.now() - req.t1}ms`
      );
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

//     const uploadStream = staticFileRepo.openUploadStream({ fileName, logger });

//     Readable.from(file).pipe(uploadStream);

//     uploadStream.on('error', () => res.sendStatus(500));

//     uploadStream.on('finish', () => res.send(fileName));
//   })
// );

export default router;
