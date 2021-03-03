import fs from 'fs';
import path from 'path';

import makeVideoSpawn from '../src/makeVideoSpawn.js';
import copySomeFiles from '../src/copySomeFiles.js';
import renameFiles from '../src/renameFiles.js';

const fsp = fs.promises;

import { cam1 } from '../settings.js';

const { pathToImagesDir, pathToCamDir } = cam1;

const pathToSrcDir = path.join(pathToImagesDir)
const pathToTmpDir = path.join(pathToCamDir, 'tmp-for-111-video')

const videoFileName = '111-video';

const count = 10

fsp.rmdir(pathToTmpDir, { recursive: true })
  .then(() => fsp.mkdir(pathToTmpDir))
  .then(() => copySomeFiles(pathToSrcDir, pathToTmpDir, count))
  .then(() => renameFiles(pathToTmpDir))
  .then(() => makeVideoSpawn(pathToTmpDir, pathToCamDir, videoFileName))
  .catch((e) => console.log(e.message))

