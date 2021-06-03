import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

// console.log('cameraDirs');

import __dirname from '../initDirname.js';

const mainPath = path.join(__dirname, '..', 'cameras');
// const mainPath = path.join(path.resolve(), '..', 'cameras');

const makeDir = (pathToDir) => {
  console.log('makeDir pathToDir - ', pathToDir);
  const fullPath = path.join(mainPath, pathToDir);
  return fsp
    .mkdir(fullPath)
    .catch((e) => console.log(`catch makeDir pathToDir error: ${e.message}`));
};

const writeFile = (pathToFile, data = '') => {
  console.log('writeFile pathToFile - ', pathToFile);
  const fullPath = path.join(mainPath, pathToFile);
  return fsp
    .writeFile(fullPath, data)
    .catch((e) =>
      console.log(`catch writeFile pathToFile error: ${e.message}`)
    );
};

const removeDir = (pathToDir) => {
  console.log('removeDir pathToDir - ', pathToDir);
  const fullPath = path.join(mainPath, pathToDir);
  return fsp
    .rmdir(fullPath, { recursive: true })
    .catch((e) => console.log(`catch removeDir error: ${e.message}`));
};

const removeFile = (pathToFile) => {
  console.log('removeFile pathToFile - ', pathToFile);
  const fullPath = path.join(mainPath, pathToFile);
  return fsp
    .unlink(fullPath)
    .catch((e) => console.log(`catch removeFile error: ${e.message}`));
};

export { makeDir, writeFile, removeDir, removeFile };