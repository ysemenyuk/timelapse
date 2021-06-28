// import fs from 'fs';
// import path from 'path';
// import axios from 'axios';
// import sharp from 'sharp';
// import { Readable } from 'stream';

import { v4 as uuidv4 } from 'uuid';
import { getBucket } from '../dbConfig.js';

import cameraService from '../services/camera.service.js';
import imageService from '../services/image.service.js';

import cameraRepository from '../repositories/camera.repository.js';
import cameraFileRepository from '../repositories/cameraFile.repository.js';

import __dirname from '../dirname.js';

const getScreenshot = async ({ userId, cameraId, logger }) => {
  logger.info(`cameraScreenshotController.getScreenshot cameraId: ${cameraId}`);

  const name = uuidv4();

  const fileName = `${name}.jpg`;
  const originalName = `${name}-orig.jpg`;
  const previewName = `${name}-prev.jpg`;

  const camera = await cameraRepository.getOne({ userId, cameraId, logger });

  // console.log('cameraScreenshotController.getScreenshot camera', camera);

  const dataStream = await cameraService.getScreenshot(camera.screenshotLink, 'stream');

  // dataStream.pipe(fs.createWriteStream(path.join(__dirname, 'image-original.jpg')));
  // dataStream
  //   .pipe(sharp().resize(200))
  //   .pipe(fs.createWriteStream(path.join(__dirname, 'image-preview.jpg')));

  const bucket = getBucket();

  const originalSizeUloadStream = bucket.openUploadStream(originalName);
  const previewSizeUloadStream = bucket.openUploadStream(previewName);

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

  const file = await cameraFileRepository.createOne({
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
