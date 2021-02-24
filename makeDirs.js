import fs from 'fs';

import { logger } from './utils.js';

const fsp = fs.promises;

const makeDir = (pathToDir) => {
  console.log(`makeDir: ${pathToDir}`);
  return fsp.mkdir(pathToDir)
    .catch((e) => {
      console.log(`catch mkdir error: ${e.message}`);
    })
};


const makeDirsForCamera = (settings) => {

  const { pathToCamDir, pathToimagesDir, pathToVideosDir } = settings;

  return makeDir(pathToCamDir)
    .then(() => makeDir(pathToimagesDir))
    .then(() => makeDir(pathToVideosDir))

};


export default makeDirsForCamera;


import { cam1 } from './settings.js';

makeDirsForCamera(cam1);
