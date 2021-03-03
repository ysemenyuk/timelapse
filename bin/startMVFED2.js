import fs from 'fs';
import path from 'path'

import makeVideoSpawn from '../src/makeVideoSpawn.js';
import copySomeFiles from '../src/copySomeFiles.js';
import renameFiles from '../src/renameFiles.js';
import { makeTodayName } from '../src/utils.js'

import { cam1 } from '../settings.js';

const fsp = fs.promises;

// make video for today dir

const makeVideoFileEveryDay = (settings) => {

  setTimeout(() => makeVideoFileEveryDay(settings), 1000 * 60 * 60 * 24);

  const { pathToImagesDir, pathToVideosDir, pathToCamDir } = settings;
  
  const dirName = makeTodayName(new Date());
  // const dirName = '2021-02-28';
  const videoFileName = `${dirName}-video`;

  const pathToTodayDir = path.join(pathToImagesDir, dirName);
  const pathToTmpDir = path.join(pathToCamDir, 'tmp-for-everyday-video')
  

  return fsp.rmdir(pathToTmpDir, { recursive: true })
    .then(() => fsp.mkdir(pathToTmpDir))
    .then(() => copySomeFiles(pathToTodayDir, pathToTmpDir))
    .then(() => renameFiles(pathToTmpDir))
    .then(() => makeVideoSpawn(pathToTmpDir, pathToVideosDir, videoFileName))
    .catch((e) => console.log(e.message))

};


const startMakeVideoFileEveryDay = (settings) => {

  const currentTime = new Date();
  const { year, month, date } = parseTime(currentTime);
  const startTime = new Date(year, month, date, 22, 0);

  setTimeout(() => makeVideoFileEveryDay(settings), startTime - currentTime);
};


// makeVideoFileEveryDay(cam1)

startMakeVideoFileEveryDay(cam1);
