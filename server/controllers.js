import cameraController from './controllers/camera.controller.js';
import fileController from './controllers/file.controller.js';

export default (app) => {
  const constrollers = {
    cameraController: cameraController(app),
    fileController: fileController(app),
  };

  return constrollers;
};
