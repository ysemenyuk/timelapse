import fs from 'fs';
import path from 'path';
import { exec } from "child_process";
import util from 'util';

import { log } from './utils.js'

const execp = util.promisify(exec);

const makeVideoFile = (pathToImages, pathToVideoFiles, videoFileName, pathToLogFile) => {

  log(pathToLogFile, `start makeVideoFile images dir - ${pathToImages}`);
  log(pathToLogFile, `start makeVideoFile output file - ${pathToVideoFiles}\\${videoFileName}.mp4`);
  
  return execp(`ffmpeg -y -r 25 -i ${pathToImages}\\img-%06d.jpg -vcodec libx264 ${pathToVideoFiles}\\${videoFileName}.mp4`)
    .then(({ stdout, stderr }) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      log(pathToLogFile, `end makeVideoFile images dir - ${pathToImages}`);
      log(pathToLogFile, `end makeVideoFile ${pathToVideoFiles}\\${videoFileName}.mp4`);
    })
    .catch((e) => {
      log(pathToLogFile, `error makeVideoFile ${pathToVideoFiles}\\${videoFileName}.mp4`);
      log(pathToLogFile, `error make VideoFile ${e.message}`);
      // console.lod('error:', e.message)
    })
}

export default makeVideoFile;

// const pathToApp = path.resolve('../');
// const pathToCamDir = path.join(pathToApp, 'cam1')

// const pathToImages = path.join(pathToCamDir, 'images', '20210220');
// const pathToVideoFiles = path.join(pathToCamDir, 'videos');
// const videoFileName = '20210220';
// const pathToLogFile = path.join(pathToCamDir, 'test-log.txt');

// makeVideoFile(pathToImages, pathToVideoFiles, videoFileName, pathToLogFile)

// setInterval(() => {
//   console.log('interval', (new Date()).toLocaleString())
// }, 1000);
