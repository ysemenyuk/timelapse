import fs from 'fs';
import path from 'path';

import makeVideoSpawn from '../src/makeVideoSpawn.js';
import copyFilesForVideo from '../src/copyFilesForVideo.js';
import { makeDirsPaths, makeFilesPaths } from '../src/makePaths.js';

const fsp = fs.promises;

import { cam1 } from '../settings.js';

const { pathToImagesDir, pathToCamDir } = cam1;

const videoFileName = 'full-video';

const time = 60
const fps = 25

const pathToSrcDir = path.join(pathToImagesDir)
const pathToOutDir = path.join(pathToCamDir)
const pathToTmpDir = path.join(pathToCamDir, 'tmp-for-full-video')

fsp.rmdir(pathToTmpDir, { recursive: true })
  .then(() => fsp.mkdir(pathToTmpDir))
  .then(() => makeDirsPaths(pathToSrcDir))
  .then((dirsPaths) => makeFilesPaths(dirsPaths))
  .then((filesPaths) => copyFilesForVideo(filesPaths, pathToTmpDir, time, fps))
  .then(() => makeVideoSpawn(pathToTmpDir, pathToOutDir, videoFileName))
  .catch((e) => console.log(e.message))
