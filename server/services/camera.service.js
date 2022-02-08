import path from 'path';
import { makeFileName, promisifyUploadStream } from '../utils/index.js';
import cameraFileService from './cameraFile.service.js';
import cameraApiService from './cameraApi.service.js';
import Camera from '../models/Camera.js';

const getAll = async ({ userId, logger }) => {
  logger(`cameraService.getAll userId: ${userId}`);
  const cameras = await Camera.find({ user: userId });
  return cameras;
};

const getOne = async ({ cameraId, logger }) => {
  logger(`cameraService.getOne cameraId: ${cameraId}`);
  const camera = await Camera.findOne({ _id: cameraId }).populate('imagesByTimeTask');
  return camera;
};

const getOneById = async ({ cameraId, logger }) => {
  logger(`cameraService.getOneById cameraId: ${cameraId}`);
  const camera = await Camera.findOne({ _id: cameraId });
  return camera;
};

const createOne = async ({ userId, payload, logger }) => {
  logger(`cameraService.createOne payload: ${payload}`);
  const camera = new Camera({ user: userId, ...payload });
  await camera.save();
  return camera;
};

const createScreenshot = async ({ userId, cameraId, payload, storage, logger }) => {
  logger(`cameraService.createScreenshot payload: ${payload}`);

  const { parentId } = payload;

  const camera = await Camera.findOne({ _id: cameraId });
  const parent = await cameraFileService.getOneById({ fileId: parentId, logger });

  // TODO: check folder if not exist create

  const filePath = path.join(camera._id.toString(), parent.name);

  const date = new Date();
  const fileName = makeFileName(date);

  // console.log(111, date, date.toString())

  const dataStream = await cameraApiService.getScreenshot(camera.screenshotLink, 'stream');
  const uploadStream = storage.openUploadStream({ filePath, fileName, logger });

  dataStream.pipe(uploadStream);

  await promisifyUploadStream(uploadStream);

  // console.log('date', date, date.toLocaleString());
  // console.log('date', date, date.toISOString());

  const screenshot = await cameraFileService.createOne({
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

  return screenshot;
};

const updateOne = async ({ cameraId, payload, logger }) => {
  logger(`cameraService.updateOne cameraId: ${cameraId}, payload: ${payload}`);
  const updated = await Camera.updateOne({ _id: cameraId }, payload);
  return updated;
};

const deleteOne = async ({ cameraId, logger }) => {
  logger(`cameraService.deleteOne cameraId: ${cameraId}`);
  const camera = await Camera.findOne({ _id: cameraId });
  const deleted = await camera.remove();
  return deleted;
};

export default { getAll, getOne, getOneById, createOne, createScreenshot, updateOne, deleteOne };
