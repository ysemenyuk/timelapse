import { v4 as uuidv4 } from 'uuid';
import staticFileRepo from '../repositories/staticFile.repository.js';

import cameraService from '../services/camera.service.js';
import imageService from '../services/image.service.js';

import cameraRepository from '../repositories/camera.repository.js';
import cameraFileRepo from '../repositories/cameraFile.repository.js';

import __dirname from '../dirname.js';

const getScreenshot = async ({ userId, cameraId, logger }) => {
  logger(`cameraScreenshotController.getScreenshot cameraId: ${cameraId}`);

  const name = uuidv4();

  const fileName = `${name}.jpg`;
  const originalName = `${name}-orig.jpg`;
  const previewName = `${name}-prev.jpg`;

  const camera = await cameraRepository.getOne({ userId, cameraId, logger });

  const dataStream = await cameraService.getScreenshot(camera.screenshotLink, 'stream');

  // dataStream.pipe(fs.createWriteStream(path.join(__dirname, 'image-original.jpg')));
  // dataStream
  //   .pipe(sharp().resize(200))
  //   .pipe(fs.createWriteStream(path.join(__dirname, 'image-preview.jpg')));

  const originalSizeUloadStream = staticFileRepo.openUploadStream(originalName);
  const previewSizeUloadStream = staticFileRepo.openUploadStream(previewName);

  const resizeImageStream = imageService.resize(200);

  dataStream.pipe(originalSizeUloadStream);
  dataStream.pipe(resizeImageStream).pipe(previewSizeUloadStream);

  originalSizeUloadStream.on('error', () => {
    console.log('error originalSizeUloadStream');
  });

  originalSizeUloadStream.on('close', async () => {
    console.log('close originalSizeUloadStream');
  });

  previewSizeUloadStream.on('error', () => {
    console.log('error previewSizeUloadStream');
  });

  previewSizeUloadStream.on('close', async () => {
    console.log('close previewSizeUloadStream');
  });

  const file = await cameraFileRepo.createOne({
    userId,
    cameraId,
    name: fileName,
    original: originalName,
    preview: previewName,
    parent: camera.screenshotsFolder,
    logger,
  });

  // console.log('cameraScreenshotController.getScreenshot file', file);

  return file;
};

export default { getScreenshot };
