import fs from 'fs';
import path from 'path';

import makeVideoSpawn from '../funcs/makeVideoSpawn.js';
import copyFilesForVideo from '../funcs/copyFilesForVideo.js';
import { makeDirsPathsFromOneDir, makeFilesPathsFromManyDirs } from '../funcs/makePaths.js';

import { cam1 } from '../cameras.js';

const fsp = fs.promises;

const { pathToImagesDir, pathToCamDir } = cam1;

const videoFileName = 'full-video';

const time = 60;
const fps = 25;

const pathToSrcDir = path.join(pathToImagesDir);
const pathToOutDir = path.join(pathToCamDir);
const pathToTmpDir = path.join(pathToCamDir, 'tmp-for-full-video');

fsp.rmdir(pathToTmpDir, { recursive: true })
  .then(() => fsp.mkdir(pathToTmpDir))
  .then(() => makeDirsPathsFromOneDir(pathToSrcDir))
  .then((dirsPaths) => makeFilesPathsFromManyDirs(dirsPaths))
  .then((filesPaths) => copyFilesForVideo(filesPaths, pathToTmpDir, time, fps))
  .then(() => makeVideoSpawn(pathToTmpDir, pathToOutDir, videoFileName))
  .catch((e) => console.log(e.message));
