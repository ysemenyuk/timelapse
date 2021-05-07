import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

const fsp = fs.promises;
const execp = util.promisify(exec);

const concatVideoFiles = (pathToVideosDir, pathToOutputDir, videoFileName) => {
  const pathToVideoFile = path.join(pathToOutputDir, `${videoFileName}-video.mp4`);
  const pathToListFile = path.join(pathToOutputDir, `${videoFileName}-list.txt`);

  return fsp.readdir(pathToVideosDir)
    .then((files) => {
      const newPathToVideosDir = pathToVideosDir.split('\\').join('\\\\');
      const pathsToVideoFiles = files.map((file) => `file ${newPathToVideosDir}\\\\${file}`);
      return fsp.writeFile(pathToListFile, pathsToVideoFiles.join('\n'));
    })
    .then(() => execp(`ffmpeg -y -f concat -safe 0 -i ${pathToListFile} -c copy ${pathToVideoFile}`))
    .then(({ stdout, stderr }) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    })
    .catch((e) => {
      console.log('error:', e.message);
    });
};

export default concatVideoFiles;

// import { cam1 } from './settings.js';

// const { camName, pathToCamDir, pathToVideosDir, pathToLogFile } = cam1;
// concatVideoFiles(pathToVideosDir, pathToCamDir, camName, pathToLogFile);

// startConcatVideoFilesEveryDay(cam1)
