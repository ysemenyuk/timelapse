import path from 'path';
import storage from '../storage/index.js';
import cameraService from '../services/camera.service.js';
import cameraRepository from '../repositories/camera.repository.js';
import fileRepository from '../repositories/file.repository.js';
import { makeFileName, promisifyUploadStream } from '../utils/index.js';
import { storageType } from '../storage/index.js';

const getAll = async ({ userId, cameraId, parentId, logger }) => {
  logger(`fileController.getAll cameraId: ${cameraId}`);

  const files = await fileRepository.getAll({ userId, cameraId, parentId, logger });
  return files;
};

const getOne = async ({ userId, cameraId, id, logger }) => {
  logger(`fileController.getOne id: ${id}`);

  const file = await fileRepository.getOneById({ userId, cameraId, id, logger });

  if (!file) {
    logger(`fileController.getOne id: ${id} - not found`);
    throw new Error('file not found');
  }

  return file;
};

const createFolder = async ({ userId, cameraId, parentId, name, logger }) => {
  logger(`fileController.createOne`);

  return await fileRepository.createOne({ userId, cameraId, parentId, name, type: 'folder', logger });
};

const deleteOne = async ({ userId, cameraId, id, logger }) => {
  logger(`fileController.deleteOne id: ${id}`);

  const file = await fileRepository.getOneById({ userId, cameraId, id, logger });

  if (!file) {
    logger(`fileController.deleteOne id: ${id} - not found`);
    throw new Error('file not found');
  }

  // TODO: delete file from storage

  return await fileRepository.deleteOne({ userId, cameraId, id, logger });
};

const deleteMany = async ({ userId, cameraId, filesIds, logger }) => {
  logger(`fileController.deleteMany`);

  // TODO: delete files from storage

  return await fileRepository.deleteMany({ userId, cameraId, filesIds, logger });
};

const createScreenshot = async ({ userId, cameraId, parentId, logger }) => {
  logger(`fileController.createScreenshot cameraId: ${cameraId}`);

  const camera = await cameraRepository.getOne({ userId, cameraId, logger });
  const parent = await fileRepository.getOneById({ userId, cameraId, id: parentId, logger });

  // TODO: check folder if not exist create

  const filePath = path.join(camera._id.toString(), parent.name);

  const date = new Date();
  const fileName = makeFileName(date);

  // console.log(111, date, date.toString())

  const dataStream = await cameraService.getScreenshot(camera.screenshotLink, 'stream');
  const uploadStream = storage.openUploadStream({ filePath, fileName, logger });

  dataStream.pipe(uploadStream);

  await promisifyUploadStream(uploadStream);

  console.log('date', date, date.toLocaleString());
  console.log('date', date, date.toISOString());


  const file = await fileRepository.createOne({
    name: fileName,
    date: date.toISOString(),
    user: userId,
    camera: cameraId,
    parent: parent._id,
    path: filePath,
    storage: storageType,
    type: 'screenshot',
    logger,
  });

  console.log('fileController.createScreenshot file', file);

  return file;
};

export default { getAll, getOne, createFolder, deleteOne, deleteMany, createScreenshot };
