import fs from 'fs';

const fsp = fs.promises;

const makeDirsForCamera = (paths) => {
  console.log('makeDirsForCamera - ', paths);

  const {
    pathToCamDir,
    pathToImagesDir,
    pathToVideosDir,
    pathToLogFile,
  } = paths;

  return fsp
    .mkdir(pathToCamDir)
    .then(() => fsp.mkdir(pathToImagesDir))
    .then(() => fsp.mkdir(pathToVideosDir))
    .then(() => fsp.writeFile(pathToLogFile, 'log file \n'))
    .catch((e) => console.log(`catch makeDirsForCamera error: ${e.message}`));
};

const removeDirsForCamera = (paths) => {
  console.log('removeDirsForCamera - ', paths);

  const { pathToCamDir } = paths;

  return fsp
    .rmdir(pathToCamDir, { recursive: true })
    .catch((e) => console.log(`catch removeDirsForCamera error: ${e.message}`));
};

export { makeDirsForCamera, removeDirsForCamera };
