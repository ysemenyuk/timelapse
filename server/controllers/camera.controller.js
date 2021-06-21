import axios from 'axios';
import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

import __dirname from '../dirname.js';

import cameraRepository from '../repositories/camera.repository.js';

const getAll = async ({ userId, logger }) => {
  logger.info(`cameraController.getAll`);

  return await cameraRepository.getAll({ userId, logger });
};

const getOne = async ({ userId, cameraId, logger }) => {
  logger.info(`cameraController.getOne cameraId: ${cameraId}`);

  const camera = await cameraRepository.getOne({ userId, cameraId, logger });

  if (!camera) {
    logger.error(`cameraController.getOne cameraId: ${cameraId} - not found`);
    throw new Error('camera not found');
  }

  return camera;
};

const createOne = async ({ userId, payload, logger }) => {
  logger.info(`cameraController.createOne payload: ${payload}`);

  return await cameraRepository.createOne({ userId, payload, logger });
};

const updateOne = async ({ userId, cameraId, payload, logger }) => {
  logger.info(`cameraController.updateOne cameraId: ${cameraId}, payload: ${payload}`);

  const camera = await cameraRepository.getOne({ userId, cameraId, logger });

  if (!camera) {
    logger.error(`cameraController.updateOne cameraId: ${cameraId} - not found`);
    throw new Error('camera not found');
  }

  await cameraRepository.updateOne({ userId, cameraId, payload, logger });

  return await cameraRepository.getOne({ userId, cameraId, logger });
};

const deleteOne = async ({ userId, cameraId, logger }) => {
  logger.info(`cameraController.deleteOne cameraId: ${cameraId}`);

  const camera = await cameraRepository.getOne({ userId, cameraId, logger });

  if (!camera) {
    logger.error(`cameraController.deleteOne cameraId: ${cameraId} - not found`);
    throw new Error('camera not found');
  }

  return await cameraRepository.deleteOne({ userId, cameraId, logger });
};

export default { getAll, getOne, createOne, updateOne, deleteOne };
