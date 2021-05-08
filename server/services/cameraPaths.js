import path from 'path';

import { __dirname } from '../index.js';

const getCameraPaths = (camera) => {
  const pathToCamDir = path.join(__dirname, '..', 'cameras', camera.id);

  return {
    pathToCamDir,
    pathToImagesDir: path.join(pathToCamDir, 'images'),
    pathToVideosDir: path.join(pathToCamDir, 'videos'),
    pathToLogFile: path.join(pathToCamDir, `${camera.id}-log.txt`),
  };
};

export { getCameraPaths };
