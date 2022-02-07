import cameraController from './camera.controller.js';
import fileController from './file.controller.js';
import taskController from './task.controller.js';
import userController from './user.controller.js';

export default () => {
  const constrollers = {
    camera: cameraController,
    file: fileController,
    task: taskController,
    user: userController,
  };

  return constrollers;
};
