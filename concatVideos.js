import fs from 'fs';
import path from 'path';
import { exec } from "child_process";
import util from 'util';

import { log } from './utils.js'

const fsp = fs.promises;
const execp = util.promisify(exec);

// ffmpeg -f concat -safe 0 -i G:\videos\list.txt -c copy G:\videos\output.mp4
// list.txt
// file G:\\videos\\timelapse-01.mp4
// file G:\\videos\\timelapse-02.mp4

const concatVideoFiles = (pathToVideosDir, pathToOutputDir, videoFileName, pathToLogFile) => {

  log(pathToLogFile, `make fullVideo File ${pathToOutputDir}\\${videoFileName}-video.mp4`);
  const pathToListFile = path.join(pathToOutputDir, `${videoFileName}-list.txt`)

  return fsp.readdir(pathToVideosDir)
    .then((files) => {
      console.log(pathToVideosDir)
      const newpathToVideosDir = pathToVideosDir.split('\\').join('\\\\');
      console.log(newpathToVideosDir);
      const pathsToVideoFiles = files.map((file) => `file ${newpathToVideosDir}\\\\${file}`);
      return fsp.writeFile(pathToListFile, pathsToVideoFiles.join('\n'));
    })
    .then(() => {
      log(pathToLogFile, `start concatVideoFiles ${pathToOutputDir}\\${videoFileName}-video.mp4`);
      return execp(`ffmpeg -y -f concat -safe 0 -i ${pathToListFile} -c copy ${pathToOutputDir}\\${videoFileName}-video.mp4`)
    })
    .then(({ stdout, stderr }) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      log(pathToLogFile, `end concatVideoFiles ${pathToOutputDir}\\${videoFileName}-video.mp4`);
    })
    .catch((e) => {
      log(pathToLogFile, `error concatVideoFiles ${e.message}`);
      // console.log('error:', e.message)
    })

}

export default concatVideoFiles;

// const pathToApp = path.resolve('../');

// const pathToVideoFiles = path.join(pathToCamDir, 'videos');
// const pathToCamDir = path.join(pathToApp, 'cam1')
// const videoFileName = '20210220';
// const pathToLogFile = path.join(pathToCamDir, 'test-log.txt');

// concatVideoFiles(pathToVideoFiles, pathToCamDir, videoFileName, pathToLogFile)

// setInterval(() => {
//   console.log('interval', (new Date()).toLocaleString())
// }, 1000);
