import path from 'path';

console.log('cameraPaths');

// import { __dirname } from '../index.js';

const getCameraNames = (camera) => {
  const cameraDir = camera._id.toString();
  console.log('getCameraNames cameraDir-', cameraDir);
  return {
    cameraDir,
    screenshotsDir: 'screenshots',
    imagesDir: 'images',
    videosDir: 'videos',
    logFile: `${cameraDir}-camera-log.txt`,
  };
};

const getCameraPaths = (names) => {
  const { cameraDir, screenshotsDir, imagesDir, videosDir, logFile } = names;
  const pathToCameraDir = path.join(cameraDir);
  console.log('getCameraPaths pathToCameraDir -', pathToCameraDir);
  return {
    pathToCameraDir,
    pathToScreenshotsDir: path.join(pathToCameraDir, screenshotsDir),
    pathToImagesDir: path.join(pathToCameraDir, imagesDir),
    pathToVideosDir: path.join(pathToCameraDir, videosDir),
    pathToLogFile: path.join(pathToCameraDir, logFile),
  };
};

export { getCameraPaths, getCameraNames };
