import fs from 'fs';
import path from 'path';

import makeVideoSpawn from '../src/makeVideoSpawn.js';
import copyFilesForVideo from '../src/copyFilesForVideo.js';
import { makeDirsPaths, makeFilesPaths } from '../src/makePaths.js';

const fsp = fs.promises;

import { cam1 } from '../settings.js';

const { pathToImagesDir, pathToCamDir } = cam1;

const pathToSrcDir = path.join(pathToImagesDir)
const pathToTmpDir = path.join(pathToCamDir, 'tmp-for-TEST-video')

const videoFileName = 'TEST-video';

const time = 30

fsp.rmdir(pathToTmpDir, { recursive: true })
  .then(() => fsp.mkdir(pathToTmpDir))
  .then(() => makeDirsPaths(pathToSrcDir))
  .then((dirsPaths) => makeFilesPaths(dirsPaths))
  .then((filesPaths) => copyFilesForVideo(filesPaths, pathToTmpDir, time))
  .then(() => makeVideoSpawn(pathToTmpDir, pathToCamDir, videoFileName))
  .catch((e) => console.log(e.message))
