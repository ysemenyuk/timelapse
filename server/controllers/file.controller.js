import path from 'path';
import cameraService from '../services/camera.service.js';
import cameraRepository from '../repositories/camera.repository.js';
import fileRepository from '../repositories/file.repository.js';
import { makeFileName, promisifyUploadStream } from '../utils/index.js';

export default (storage) => {
  const getAll = async ({ cameraId, parentId, logger }) => {
    logger(`fileController.getAll cameraId: ${cameraId}`);

    const files = await fileRepository.getAll({ camera: cameraId, parent: parentId, logger });
    return files;
  };

  const getOne = async ({ id, logger }) => {
    logger(`fileController.getOne id: ${id}`);

    const file = await fileRepository.getOneById({ id, logger });

    if (!file) {
      logger(`fileController.getOne id: ${id} - not found`);
      throw new Error('file not found');
    }

    return file;
  };

  const createOne = async ({ userId, cameraId, payload, logger }) => {
    logger(`fileController.createOne`);

    return await fileRepository.createOne({ user: userId, camera: cameraId, ...payload, logger });
  };

  const deleteOne = async ({ id, logger }) => {
    logger(`fileController.deleteOne id: ${id}`);

    const file = await fileRepository.getOneById({ id, logger });

    if (!file) {
      logger(`fileController.deleteOne id: ${id} - not found`);
      throw new Error('file not found');
    }

    // TODO: delete file from storage

    return await fileRepository.deleteOne({ id, logger });
  };

  const deleteMany = async ({ ids, logger }) => {
    logger(`fileController.deleteMany`);

    // TODO: delete files from storage

    return await fileRepository.deleteMany({ ids, logger });
  };

  const createScreenshot = async ({ userId, cameraId, payload, logger }) => {
    logger(`fileController.createScreenshot cameraId: ${cameraId}`);

    const { parentId } = payload;

    const camera = await cameraRepository.getOne({ id: cameraId, logger });
    const parent = await fileRepository.getOneById({ id: parentId, logger });

    // TODO: check folder if not exist create

    const filePath = path.join(camera._id.toString(), parent.name);

    const date = new Date();
    const fileName = makeFileName(date);

    // console.log(111, date, date.toString())

    const dataStream = await cameraService.getScreenshot(camera.screenshotLink, 'stream');
    const uploadStream = storage.openUploadStream({ filePath, fileName, logger });

    dataStream.pipe(uploadStream);

    await promisifyUploadStream(uploadStream);

    // console.log('date', date, date.toLocaleString());
    // console.log('date', date, date.toISOString());

    const file = await fileRepository.createOne({
      name: fileName,
      date: date.toISOString(),
      user: userId,
      camera: cameraId,
      parent: parentId,
      path: filePath,
      storage: storage.type,
      type: 'screenshot',
      logger,
    });

    // console.log('fileController.createScreenshot file', file);

    return file;
  };

  return { getAll, getOne, createOne, deleteOne, deleteMany, createScreenshot };
};
