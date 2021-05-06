import fs from 'fs';
import path from 'path';

import copyFilesForVideo from '../funcs/copyFilesForVideo.js';
import makeVideoSpawn from '../funcs/makeVideoSpawn.js';
import { makeTodayName, parseTime } from '../funcs/utils.js';
import { makeFilesPathsFromManyDirs } from '../funcs/makePaths.js';

import { cam1 } from '../cameras.js';

const fsp = fs.promises;

// make video for today dir

const makeVideoFileEveryDay = (settings) => {
  setTimeout(() => makeVideoFileEveryDay(settings), 1000 * 60 * 60 * 24);

  const { pathToImagesDir, pathToVideosDir, pathToCamDir } = settings;

  const dirName = makeTodayName(new Date());
  const videoFileName = `${dirName}-video`;

  const pathToTodayDir = path.join(pathToImagesDir, dirName);
  const pathToTmpDir = path.join(pathToCamDir, 'tmp-for-everyday-video');

  fsp.rmdir(pathToTmpDir, { recursive: true })
    .then(() => fsp.mkdir(pathToTmpDir))
    .then(() => makeFilesPathsFromManyDirs([pathToTodayDir]))
    .then((filesPaths) => copyFilesForVideo(filesPaths, pathToTmpDir))
    .then(() => makeVideoSpawn(pathToTmpDir, pathToVideosDir, videoFileName))
    .catch((e) => console.log(e.message));
};

const startMakeVideoFileEveryDay = (settings) => {
  const currentTime = new Date();
  const { year, month, date } = parseTime(currentTime);
  const startTime = new Date(year, month, date, 22, 0);

  setTimeout(() => makeVideoFileEveryDay(settings), startTime - currentTime);
};

startMakeVideoFileEveryDay(cam1);
