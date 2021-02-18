import fs from 'fs';
import path from 'path';
import { exec } from "child_process";
import util from 'util';

const execp = util.promisify(exec);

const makeVideoFile = (pathToImages, pathToVideoFiles, videoFileName) => {
  
  return execp(`ffmpeg -y -r 25 -i ${pathToImages}\\img-%06d.jpg -vcodec libx264 ${pathToVideoFiles}\\${videoFileName}.mp4`)
    .then(({ stdout, stderr }) => {
      console.log('stdout:', stdout);
      console.error('stderr:', stderr);
    })
    // .catch((e) => {
    //   console.dir('error:', e.message)
    // })
}

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


export default makeVideoFile;