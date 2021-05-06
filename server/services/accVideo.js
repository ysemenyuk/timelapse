// import fs from 'fs';
// import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const execp = util.promisify(exec);

// ускорение видео в два раза
// ffmpeg -i timelapse.mp4 -filter:v "setpts=0.5*PTS" -vcodec libx264 timelapse-2.mp4

const accVideoFile = (pathToInputVideo, pathToOutputVideo, times) => execp(`ffmpeg -i ${pathToInputVideo} -filter:v "setpts=${1 / times}*PTS" -vcodec libx264 ${pathToOutputVideo}`)
  .then(({ stdout, stderr }) => {
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  })
  .catch((e) => {
    console.lod('error:', e.message);
  });

export default accVideoFile;

// const pathToApp = path.resolve('../');
// const pathToCamDir = path.join(pathToApp, 'camera1')

// const pathToInputVideo = path.join(pathToCamDir, 'camera1-video.mp4');
// const pathToOutputVideo = path.join(pathToCamDir, 'camera1-video-10-times.mp4');
// const pathToLogFile = path.join(pathToCamDir, 'test-log.txt');

// accVideoFile(pathToInputVideo, pathToOutputVideo, pathToLogFile)
