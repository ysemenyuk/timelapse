import fs from 'fs';
import path from 'path';
import { exec } from "child_process";
import util from 'util';

import { logger } from './utils.js'

const fsp = fs.promises;
const execp = util.promisify(exec);


const concatVideoFiles = (pathToVideosDir, pathToOutputDir, videoFileName, pathToLogFile) => {

  const pathToVideoFile = path.join(pathToOutputDir, `${videoFileName}-video.mp4`)

  logger(`make fullVideo File ${pathToVideoFile}`, pathToLogFile);
  const pathToListFile = path.join(pathToOutputDir, `${videoFileName}-list.txt`)

  return fsp.readdir(pathToVideosDir)
    .then((files) => {
      const newPathToVideosDir = pathToVideosDir.split('\\').join('\\\\');
      const pathsToVideoFiles = files.map((file) => `file ${newPathToVideosDir}\\\\${file}`);
      return fsp.writeFile(pathToListFile, pathsToVideoFiles.join('\n'));
    })
    .then(() => {
      logger(`start concatVideoFiles ${pathToVideoFile}`, pathToLogFile);
      return execp(`ffmpeg -y -f concat -safe 0 -i ${pathToListFile} -c copy ${pathToVideoFile}`)
    })
    .then(({ stdout, stderr }) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      logger(`end concatVideoFiles ${pathToVideosDir}`, pathToLogFile);
      logger(`end concatVideoFiles ${pathToVideoFile}`, pathToLogFile);
    })
    .catch((e) => {
      logger(`error concatVideoFiles ${pathToVideoFile}`, pathToLogFile);
      logger(`error concatVideoFiles ${e.message}`, pathToLogFile);
      // console.log('error:', e.message)
    })

};


const concatVideoFilesEveryDay = (settings) => {

  setTimeout(() => concatVideoFilesByTime(settings), 1000 * 60 * 60 * 24);

  const { camName, pathToCamDir, pathToVideosDir, pathToLogFile } = settings;
  concatVideoFiles(pathToVideosDir, pathToCamDir, camName, pathToLogFile);
};


const startConcatVideoFilesEveryDay = (settings) => {

  const currentTime = new Date();
  const { year, month, date } = parseTime(currentTime);
  const startTime = new Date(year, month, date, 23, 0);

  setTimeout(() => concatVideoFilesEveryDay(settings), startTime - currentTime);
};



export default startConcatVideoFilesEveryDay;


// import { cam1 } from './settings.js';

// const { camName, pathToCamDir, pathToVideosDir, pathToLogFile } = cam1;
// concatVideoFiles(pathToVideosDir, pathToCamDir, camName, pathToLogFile);

// startConcatVideoFilesEveryDay(cam1)
