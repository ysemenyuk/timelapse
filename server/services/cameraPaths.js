import fs from 'fs';
import path from 'path';

import { __dirname } from '../index.js';

const fsp = fs.promises;

const getCameraPaths = (camera) => {
  const pathToCamDir = path.join(__dirname, 'cameras', camera._id);
  return {
    pathToCamDir,
    pathToImagesDir: path.join(pathToCamDir, 'images'),
    pathToVideosDir: path.join(pathToCamDir, 'videos'),
    pathToLogFile: path.join(pathToCamDir, `${camera.id}-log.txt`),
  };
};

export { getCameraPaths };
