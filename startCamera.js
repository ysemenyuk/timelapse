import fs from 'fs';

import getImagesByTime from './getImages.js';
import makeVideoFileEveryDay from './makeVideo.js';
import concatVideoFileEveryDay from './concatVideos.js';

import { logger } from './utils.js';

const fsp = fs.promises;


const makeDir = (pathToDir) => {
  return fsp.mkdir(pathToDir)
    .catch((e) => {
      console.log(`catch mkdir error: ${e.message}`);
    })
};


const makeDirsForCamera = (settings) => {

  const { pathToCamDir, pathToimagesDir, pathToVideosDir, pathToLogFile } = settings;
  logger(`makeDirs: ${pathToCamDir}`, pathToLogFile);

  return makeDir(pathToCamDir)
    .then(() => makeDir(pathToimagesDir))
    .then(() => makeDir(pathToVideosDir))

};


const startCamera = (settings) => {

  const { pathToCamDir, pathToLogFile } = settings;
  logger(`startCamera: ${pathToCamDir}`, pathToLogFile);

  makeDirsForCamera(settings)
    .then(() => {
      logger(`start getImagesByTime: ${pathToCamDir}`, pathToLogFile);
      logger(`start makeVideoFileByTime: ${pathToCamDir}`, pathToLogFile);
      logger(`start concatVideosByTime: ${pathToCamDir}`, pathToLogFile);

      getImagesByTime(settings)
      makeVideoFileEveryDay(settings)
      concatVideoFileEveryDay(settings)
    })
};

export default startCamera;


// import { cam1 } from './settings.js';

// makeDirsForCamera(cam1);
// startCamera(cam1);
