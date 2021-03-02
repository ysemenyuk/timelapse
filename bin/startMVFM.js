import fs from 'fs';
import path from 'path';

import makeVideoSpawn from '../src/makeVideoSpawn.js';
import copySomeFiles from '../src/copySomeFiles.js';
import renameFiles from '../src/renameFiles.js';

const fsp = fs.promises;

import { cam1 } from '../settings.js';

const { pathToImagesDir, pathToVideosDir } = cam1;

const pathToSrcDir = path.join(pathToImagesDir, '2021-03')
const pathToTmpDir = path.join(pathToImagesDir, 'tmp')
const count = 1

const videoFileName = 'video-2021-03';

fsp.rmdir(pathToTmpDir, { recursive: true })
  .then(() => fsp.mkdir(pathToTmpDir))
  .then(() => copySomeFiles(pathToSrcDir, pathToTmpDir, count))
  .then(() => renameFiles(pathToTmpDir))
  .then(() => makeVideoSpawn(pathToTmpDir, pathToVideosDir, videoFileName))
  .catch((e) => console.log(e.message))


// fsp.mkdir(pathToTmpDir)
//   .then(() => copySomeFiles(pathToSrcDir, pathToTmpDir, count))
//   .then(() => renameFiles(pathToTmpDir))
//   .then(() => makeVideoSpawn(pathToTmpDir, pathToVideosDir, videoFileName))
