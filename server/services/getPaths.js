import fs from 'fs';
import path from 'path';

import { __dirname } from '../index.js';

const fsp = fs.promises;

const getCameraPaths = (camera) => {
  const pathToCamDir = path.join(__dirname, '..', 'cameras', camera.id);
  return {
    pathToCamDir,
    pathToImagesDir: path.join(pathToCamDir, 'images'),
    pathToVideosDir: path.join(pathToCamDir, 'videos'),
    pathToLogFile: path.join(pathToCamDir, `${camera.id}-log.txt`),
  };
};

const getDirsPathsFromOneDir = (pathToImgsDir) =>
  fsp
    .readdir(pathToImgsDir)
    .then((dirsNames) =>
      dirsNames.map((dirName) => path.join(pathToImgsDir, dirName))
    );

const getFilesPathsFromManyDirs = (dirsPaths) => {
  const promises = dirsPaths.map((pathToDir) =>
    fsp
      .readdir(pathToDir)
      .then((files) => files.map((fileName) => path.join(pathToDir, fileName)))
  );

  return Promise.all(promises)
    .then((result) => result.flat())
    .catch((e) => {
      console.log('catch err makeFilesPathsFromManyDirs -', e.message);
    });
};

export { getCameraPaths, getDirsPathsFromOneDir, getFilesPathsFromManyDirs };
