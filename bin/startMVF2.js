import fs from 'fs';
import path from 'path';

import makeVideoSpawn from '../src/makeVideoSpawn.js';
import copySomeFilesFromDirs from '../src/copySomeFilesFromDirs.js';
import renameFiles from '../src/renameFiles.js';

const fsp = fs.promises;

import { cam1 } from '../settings.js';

const { pathToImagesDir, pathToCamDir } = cam1;

const pathToSrcDir = path.join(pathToImagesDir)
const pathToTmpDir = path.join(pathToCamDir, 'tmp-for-full-video')

const videoFileName = 'full-video';

const count = 10

fsp.rmdir(pathToTmpDir, { recursive: true })
  .then(() => fsp.mkdir(pathToTmpDir))
  .then(() => copySomeFilesFromDirs(pathToSrcDir, pathToTmpDir, count))
  .then(() => renameFiles(pathToTmpDir))
  .then(() => makeVideoSpawn(pathToTmpDir, pathToCamDir, videoFileName))
  .catch((e) => console.log(e.message))

