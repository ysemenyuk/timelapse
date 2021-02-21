import path from 'path';
import { exec } from "child_process";
import util from 'util';

import { parseTime, makeTodayName, logger } from './utils.js'

const execp = util.promisify(exec);


// make video from all images in dir

const makeVideoFile = (pathToImages, pathToVideosDir, videoFileName, pathToLogFile) => {

  const pathToVideoFile = path.join(pathToVideosDir, `${videoFileName}.mp4`)

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
    })
};


// make video for today dir

const makeVideoFileEveryDay = (settings) => {

  setTimeout(() => makeVideoFileByTime(settings), 1000 * 60 * 60 * 24);

  const { pathToImagesDir, pathToVideosDir, pathToLogFile } = settings;

  const dirName = makeTodayName(new Date());
  const pathToImages = path.join(pathToImagesDir, dirName);

  makeVideoFile(pathToImages, pathToVideosDir, dirName, pathToLogFile);
};


const startMakeVideoFileEveryDay = (settings) => {

  const currentTime = new Date();
  const { year, month, date } = parseTime(currentTime);
  const startTime = new Date(year, month, date, 22, 0);

  setTimeout(() => makeVideoFileEveryDay(settings), startTime - currentTime);
};


// make video for dirs without video

const makeVideoForDays = async (settings) => {

  const { pathToImagesDir, pathToVideosDir, pathToLogFile } = settings;
  
  const existingVideos = await fsp.readdir(pathToVideosDir)
  const existingNames = existingVideos.map((file) => file.slice(-4))

  const allDirsWithImgs = await fsp.readdir(pathToImagesDir)
  const dirsWithImgsWitoutVidio = allDirsWithImgs.filter((dirName) => !existingNames.includes(dirName))

  dirsWithImgsWitoutVidio.forEach(async (dirName) => {
    const pathToImages = path.join(pathToImagesDir, dirName);   
    await makeVideoFile(pathToImages, pathToVideosDir, dirName, pathToLogFile)
  })

};


export default startMakeVideoFileEveryDay;


// import { cam1 } from './settings.js';

// const { pathToImagesDir, pathToVideosDir, pathToLogFile } = cam1;
// const fileNname = '20210220';
// const imagesDirName = '20210220';
// const pathToImages = path.join(pathToImagesDir, imagesDirName);

// makeVideoFile(pathToImages, pathToVideosDir, filenName, pathToLogFile)

// startMakeVideoFileEveryDay(cam1)
