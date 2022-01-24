import path from 'path';
import storage from '../storage/index.js';
import cameraService from '../services/camera.service.js';
import cameraRepository from '../repositories/camera.repository.js';
import cameraFileRepo from '../repositories/cameraFile.repository.js';
import cameraFolderRepo from '../repositories/cameraFolder.repository.js';
import { makeFileName, promisifyUploadStream } from '../utils/index.js';
import * as consts from '../utils/constants.js';
import { storageType } from '../storage/index.js';

const getAll = async ({ userId, cameraId, parentId, logger }) => {
  logger(`cameraFileController.getAll cameraId: ${cameraId}`);

  const files = await cameraFileRepo.getAll({ userId, cameraId, parentId, logger });
  return files;
};

const getOne = async ({ userId, cameraId, fileId, logger }) => {
  logger(`cameraFileController.getOne fileId: ${fileId}`);

  const file = await cameraFileRepo.getOne({ userId, cameraId, fileId, logger });

  if (!file) {
    logger(`cameraFileController.getOne fileId: ${fileId} - not found`);
    throw new Error('file not found');
  }

  return file;
};

const deleteOne = async ({ userId, cameraId, fileId, logger }) => {
  logger(`cameraFileController.deleteOne fileId: ${fileId}`);

  const file = await cameraFileRepo.getOne({ userId, cameraId, fileId, logger });

  if (!file) {
    logger(`cameraFileController.deleteOne fileId: ${fileId} - not found`);
    throw new Error('file not found');
  }

  // TODO: delete file from storage

  return await cameraFileRepo.deleteOne({ userId, cameraId, fileId, logger });
};

const deleteMany = async ({ userId, cameraId, filesIds, logger }) => {
  logger(`cameraFileController.deleteMany`);

  // delete files from storage

  return await cameraFileRepo.deleteMany({ userId, cameraId, filesIds, logger });
};

const createScreenshot = async ({ userId, cameraId, logger }) => {
  logger(`cameraFileController.createScreenshot cameraId: ${cameraId}`);

  const folderName = consts.SCREENSHOTS;

  const camera = await cameraRepository.getOne({ userId, cameraId, logger });

  const parentFolder = cameraFolderRepo.getOneByName({ userId, cameraId, folderName }, logger);

  // TODO: parent folder if not exist create

  const date = new Date();
  const fileName = makeFileName(date);
  const filePath = path.join(camera._id.toString(), parentFolder.name);

  const dataStream = await cameraService.getScreenshot(camera.screenshotLink, 'stream');
  const uploadStream = storage.openUploadStream({ filePath, fileName }, logger);

  dataStream.pipe(uploadStream);

  await promisifyUploadStream(uploadStream);

  console.log('date', date, date.toLocaleString());

  const file = await cameraFileRepo.createOne(
    {
      name: fileName,
      date,
      user: userId,
      camera: cameraId,
      parent: parentFolder._id,
      path: filePath,
      storage: storageType,
    },
    logger
  );

  console.log('cameraFileController.createScreenshot file', file);

  return file;
};

export default { getAll, getOne, deleteOne, deleteMany, createScreenshot };
