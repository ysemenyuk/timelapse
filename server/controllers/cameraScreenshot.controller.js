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

  const fileName = `${name}.jpg`;
  const originalFileName = `${name}-orig.jpg`;
  const previewFileName = `${name}-prev.jpg`;

  const camera = await cameraRepository.getOne({ userId, cameraId, logger });

  const dataStream = await cameraService.getScreenshot(camera.screenshotLink, 'stream');

  // dataStream.pipe(fs.createWriteStream(path.join(__dirname, 'image-original.jpg')));
  // dataStream
  //   .pipe(sharp().resize(200))
  //   .pipe(fs.createWriteStream(path.join(__dirname, 'image-preview.jpg')));

  const originalFileUloadStream = staticFileRepo.openUploadStream({
    fileName: originalFileName,
    logger,
  });

  const previewFileUloadStream = staticFileRepo.openUploadStream({
    fileName: previewFileName,
    logger,
  });

  const resizeImage = imageService.resize(200);

  dataStream.pipe(originalFileUloadStream);
  dataStream.pipe(resizeImage).pipe(previewFileUloadStream);

  const p1 = promisifyUploadStream(originalFileUloadStream);
  const p2 = promisifyUploadStream(previewFileUloadStream);

  await Promise.all([p1, p2]);

  const file = await cameraFileRepo.createOne({
    user: userId,
    camera: cameraId,
    name: fileName,
    original: originalFileName,
    preview: previewFileName,
    parent: camera.screenshotsFolder,
    logger,
  });

  // console.log('cameraScreenshotController.createScreenshot file', file);

  return file;
};

export default { createScreenshot };
