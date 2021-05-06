import fs from 'fs';

const fsp = fs.promises;

const makeDirsForCamera = (paths) => {
  console.log('make dirs camera - ', paths);

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
    .catch((e) => console.log(`catch mkdirs error: ${e.message}`));
};

export { makeDirsForCamera };

// export default makeDirsForCamera;
