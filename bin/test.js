import fs from 'fs';
import path from 'path';

import makeVideoSpawn from '../src/makeVideoSpawn.js';
import copySomeFiles from '../src/copySomeFiles.js';
import renameFiles from '../src/renameFiles.js';

const fsp = fs.promises;

import { cam1 } from '../settings.js';

console.log(cam1)

const pathToSrcDir = path.join('G:\\', 'timelapse', 'camera1', 'images', '2021-03')
const pathToTmpDir = path.join('G:\\', 'timelapse', 'camera1', 'images', 'tmp')

const videoFileName = 'video-2021-02';
const pathToVideosDir = path.join('G:\\', 'timelapse', 'camera1')
