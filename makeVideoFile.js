import fs from 'fs';
import path from 'path';
import { exec } from "child_process";
import util from 'util';

import { makeNum, msToTime, log } from './utils.js'

const execp = util.promisify(exec);

const makeVideoFile = (pathToImages, pathToVideoFiles, videoFileName, pathToLogFile) => {

  log(pathToLogFile, `make Video File ${pathToVideoFiles}\\${videoFileName}.mp4`);
  
  return execp(`ffmpeg -y -r 25 -i ${pathToImages}\\img-%06d.jpg -vcodec libx264 ${pathToVideoFiles}\\${videoFileName}.mp4`)
    .then(({ stdout, stderr }) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    })
    .catch((e) => {
      log(pathToLogFile, `error make Video File ${e.message}`);
      console.dir('error:', e.message)
    })
}

export default makeVideoFile;

// const pathToImages = path.join('G:\\', '20210217');
// const pathToVideoFiles = 'G:\\';
// const videoFileName = 'timelapse-170221';


// console.log('start', (new Date()).toLocaleString())

// setInterval(() => {
//   console.log('interval', (new Date()).toLocaleString())
// }, 1000);

// makeVideoFile(pathToImages, pathToVideoFiles, videoFileName)
//   .then((res) => {
//     console.log('end from then', (new Date()).toLocaleString())
//   })
//   .catch((e) => {
//     console.log('error', e)
//   })


