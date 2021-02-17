import fs from 'fs';
import path from 'path';
import { exec } from "child_process";
import util from 'util';

const exec = util.promisify(require('child_process').exec);

const makeVideoFile = (pathToImages, outputPath, videoFileName) => {
  return exec("ffmpeg -r 25 -i G:/0217/img-%06d.jpg -vcodec libx264 G:/output.mp4")
    .then(({ stdout, stderr }) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    })
    .catch((e) => {
      console.log('error:', e.message)
    })
}

const pathToImages = path.join('G:\\', '2021-02-17');
const pathToVideoFiles = 'G:\\';
const videoFileName = 'timelapse-170221';

makeVideo(pathToImages, pathToVideoFiles, videoFileName);

export default makeVideoFile;