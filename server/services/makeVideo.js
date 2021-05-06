import path from 'path';
import { exec } from 'child_process';
import util from 'util';

import { logger } from './utils.js';

const execp = util.promisify(exec);

// make video from all images in dir

const makeVideoFile = (pathToImages, pathToVideosDir, videoFileName, pathToLogFile) => {
  const pathToVideoFile = path.join(pathToVideosDir, `${videoFileName}.mp4`);

  logger(`start makeVideoFile images dir - ${pathToImages}`, pathToLogFile);
  logger(`start makeVideoFile output file - ${pathToVideoFile}`, pathToLogFile);

  return execp(`ffmpeg -y -r 25 -i ${pathToImages}\\img-%06d.jpg -vcodec libx264 ${pathToVideoFile}`)
    .then(({ stdout, stderr }) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
      logger(`end makeVideoFile images dir ${pathToImages}`, pathToLogFile);
      logger(`end makeVideoFile ${pathToVideoFile}`);
    })
    .catch((e) => {
      logger(`error makeVideoFile ${pathToVideoFile}`, pathToLogFile);
      logger(`error makeVideoFile ${e.message}`, pathToLogFile);
      // console.lod('error:', e.message)
    });
};

export default makeVideoFile;

// import { cam1 } from './settings.js';

// const { pathToImagesDir, pathToVideosDir, pathToLogFile } = cam1;
// const fileNname = '20210220';
// const imagesDirName = '20210220';
// const pathToImages = path.join(pathToImagesDir, imagesDirName);

// makeVideoFile(pathToImages, pathToVideosDir, filenName, pathToLogFile)

// startMakeVideoFileEveryDay(cam1)
