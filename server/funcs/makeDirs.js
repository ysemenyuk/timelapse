import fs from 'fs';

const fsp = fs.promises;

// const makeDir = (pathToDir) => {
//   console.log(`makeDir: ${pathToDir}`);
//   return fsp.mkdir(pathToDir)
//     .catch((e) => {
//       console.log(`catch mkdir error: ${e.message}`);
//     });
// };

const makeDirsForCamera = (camera) => {
  const {
    pathToCamDir, pathToImagesDir, pathToVideosDir, pathToLogFile,
  } = camera;

  return fsp.mkdir(pathToCamDir)
    .then(() => fsp.mkdir(pathToImagesDir))
    .then(() => fsp.mkdir(pathToVideosDir))
    .then(() => fsp.writeFile(pathToLogFile))
    .catch((e) => console.log(`catch mkdir error: ${e.message}`));
};

// export { makeDir };

export default makeDirsForCamera;
