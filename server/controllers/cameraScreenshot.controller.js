import { v4 as uuidv4 } from 'uuid';
import staticFileRepo from '../repositories/staticFile.repository.js';

import cameraService from '../services/camera.service.js';
import imageService from '../services/image.service.js';

import cameraRepository from '../repositories/camera.repository.js';
import cameraFileRepo from '../repositories/cameraFile.repository.js';

// import __dirname from '../dirname.js';
import { promisifyUploadStream } from '../utils/index.js';

const createScreenshot = async ({ userId, cameraId, logger }) => {
  logger(`cameraScreenshotController.createScreenshot cameraId: ${cameraId}`);

  const name = uuidv4();

  const originalFileName = `${name}.jpg`;
  const thumbnailFileName = `${name}-thumbnail.jpg`;

  const camera = await cameraRepository.getOne({ userId, cameraId, logger });

  const dataStream = await cameraService.getScreenshot(camera.screenshotLink, 'stream');

  const originalFileUloadStream = staticFileRepo.openUploadStream({
    fileName: originalFileName,
    logger,
  });

  const previewFileUloadStream = staticFileRepo.openUploadStream({
    fileName: thumbnailFileName,
    logger,
  });

  const resizeImage = imageService.resize(200);

  dataStream.pipe(originalFileUloadStream);
  dataStream.pipe(resizeImage).pipe(previewFileUloadStream);

  const s1 = promisifyUploadStream(originalFileUloadStream);
  const s2 = promisifyUploadStream(previewFileUloadStream);

  await Promise.all([s1, s2]);

  const file = await cameraFileRepo.createOne({
    user: userId,
    camera: cameraId,
    name: originalFileName,
    original: originalFileUloadStream.id,
    thumbnail: previewFileUloadStream.id,
    parent: camera.screenshotsFolder,
    logger,
  });

  console.log('cameraScreenshotController.createScreenshot file', file);

  return file;
};

export default { createScreenshot };
