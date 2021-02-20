import fs from 'fs';
import path from 'path';
import { exec } from "child_process";
import util from 'util';

import { log } from './utils.js'

const execp = util.promisify(exec);

// ускорение видео в два раза
// ffmpeg -i timelapse.mp4 -filter:v "setpts=0.5*PTS" -vcodec libx264 timelapse-2.mp4

const accVideoFile = (pathToInputVideo, pathToOutputVideo, pathToLogFile) => {

  log(pathToLogFile, `start accVideoFile from - ${pathToInputVideo}`);
  log(pathToLogFile, `start accVideoFile into - ${pathToOutputVideo}`);
  
  return execp(`ffmpeg -i ${pathToInputVideo} -filter:v "setpts=0.5*PTS" -vcodec libx264 ${pathToOutputVideo}`)
    .then(({ stdout, stderr }) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      log(pathToLogFile, `end accVideoFile - ${pathToOutputVideo}`);
    })
    .catch((e) => {
      log(pathToLogFile, `error accVideoFile ${pathToInputVideo}`);
      log(pathToLogFile, `error accVideoFile ${e.message}`);
      // console.lod('error:', e.message)
    })
}

export default accVideoFile;

// const pathToApp = path.resolve('../');
// const pathToCamDir = path.join(pathToApp, 'cam1')

// const pathToInputVideo = path.join(pathToCamDir, 'videos', '20210220.mp4');
// const pathToOutputVideo = path.join(pathToCamDir, 'videos', '20210220-time2.mp4');
// const pathToLogFile = path.join(pathToCamDir, 'test-log.txt');

// accVideoFile(pathToInputVideo, pathToOutputVideo, pathToLogFile)

// setInterval(() => {
//   console.log('interval', (new Date()).toLocaleString())
// }, 1000);