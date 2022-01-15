import express from 'express';
// import imageService from '../services/image.service.js';
import { asyncHandler } from '../middleware/errorHandlerMiddleware.js';
import staticFileRepo from '../repositories/staticFile.repository.js';
import cameraFileRepo from '../repositories/cameraFile.repository.js';

const router = express.Router();

router.get(
  '/:fileName',
  asyncHandler(async (req, res) => {
    req.logger(`staticFileRouter.get /files/${req.params.fileName}`);

    // const resizeImage = imageService.resize(200);

    const file = await cameraFileRepo.getOneByName({
      fileName: req.params.fileName,
      logger: req.logger,
    });

    // console.log('file', file);

    if (!file) {
      res.sendStatus(404);
      req.logResp(req);
      return;
    }

    // if (file.user.toString() !== req.userId) {
    //   res.sendStatus(401);
    //   req.logResp(req);
    //   return;
    // }

    const fileId = req.query?.size === 'thumbnail' ? file.thumbnail : file.original;

    const stream = staticFileRepo.openDownloadStream({
      fileId: fileId,
      logger: req.logger,
    });

    stream.pipe(res);

    stream.on('error', () => {
      // console.log('error');
      res.sendStatus(500);
      req.logResp(req);
    });

    stream.on('end', () => {
      // console.log('end');
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

//     const uploadStream = staticFileRepo.openUploadStream({ fileName, logger });

//     Readable.from(file).pipe(uploadStream);

//     uploadStream.on('error', () => res.sendStatus(500));

//     uploadStream.on('finish', () => res.send(fileName));
//   })
// );

export default router;
