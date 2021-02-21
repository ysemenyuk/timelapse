import fs from 'fs';
import path from 'path';
import { exec } from "child_process";
import util from 'util';

import { logger } from './utils.js'

const execp = util.promisify(exec);

// ускорение видео в два раза
// ffmpeg -i timelapse.mp4 -filter:v "setpts=0.5*PTS" -vcodec libx264 timelapse-2.mp4

const accVideoFile = (pathToInputVideo, pathToOutputVideo, pathToLogFile) => {

  // logger(`start accVideoFile from - ${pathToInputVideo}`, pathToLogFile);
  // logger(`start accVideoFile into - ${pathToOutputVideo}`, pathToLogFile);
  
  return execp(`ffmpeg -i ${pathToInputVideo} -filter:v "setpts=0.5*PTS" -vcodec libx264 ${pathToOutputVideo}`)
    .then(({ stdout, stderr }) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      // logger(`end accVideoFile - ${pathToOutputVideo}`, pathToLogFile);
    })
    .catch((e) => {
      // logger(`error accVideoFile ${pathToInputVideo}`, pathToLogFile);
      // logger(`error accVideoFile ${e.message}`, pathToLogFile);
      console.lod('error:', e.message)
    })
}

export default accVideoFile;

// const pathToApp = path.resolve('../');
// const pathToCamDir = path.join(pathToApp, 'cam1')

// const pathToInputVideo = path.join(pathToCamDir, 'videos', '20210220.mp4');
// const pathToOutputVideo = path.join(pathToCamDir, 'videos', '20210220-time2.mp4');
// const pathToLogFile = path.join(pathToCamDir, 'test-log.txt');

// accVideoFile(pathToInputVideo, pathToOutputVideo, pathToLogFile)
