import cameraRepository from '../repositories/camera.repository.js';

export default () => {
  const getAll = async ({ userId, logger }) => {
    logger(`cameraController.getAll`);
    return await cameraRepository.getAll({ user: userId, logger });
  };

  const getOne = async ({ id, logger }) => {
    logger(`cameraController.getOne id: ${id}`);
    const camera = await cameraRepository.getOne({ id, logger });

    if (!camera) {
      logger(`cameraController.getOne id: ${id} - not found`);
      throw new Error('camera not found');
    }

    return camera;
  };

  const createOne = async ({ userId, payload, logger }) => {
    logger(`cameraController.createOne payload: ${payload}`);

    // TODO: create default folders for camera
    // TODO: create default tasks

    return await cameraRepository.createOne({ user: userId, payload, logger });
  };

  const updateOne = async ({ id, payload, logger }) => {
    logger(`cameraController.updateOne id: ${id}, payload: ${payload}`);
    const camera = await cameraRepository.getOne({ id, logger });

    if (!camera) {
      logger(`cameraController.updateOne id: ${id} - not found`);
      throw new Error('camera not found');
    }

    await cameraRepository.updateOne({ id, payload, logger });
    return await cameraRepository.getOne({ id, logger });
  };

  const deleteOne = async ({ id, logger }) => {
    logger(`cameraController.deleteOne id: ${id}`);
    const camera = await cameraRepository.getOne({ id, logger });

    if (!camera) {
      logger(`cameraController.deleteOne id: ${id} - not found`);
      throw new Error('camera not found');
    }

    // TODO: delete all camera folders and files

    return await cameraRepository.deleteOne({ id, logger });
  };

  return { getAll, getOne, createOne, updateOne, deleteOne };
};
