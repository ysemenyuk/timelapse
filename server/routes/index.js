import cameraRouter from './camera.router.js';
import fileRouter from './file.router.js';
import storageRouter from './storage.router.js';
import taskRouter from './task.router.js';
import userRouter from './user.router.js';

export default () => {
  return {
    camera: cameraRouter,
    file: fileRouter,
    storage: storageRouter,
    task: taskRouter,
    user: userRouter,
  };
};
