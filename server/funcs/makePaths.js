import fs from 'fs';
import path from 'path';

const fsp = fs.promises;


const makeDirsPaths = (pathToImgsDir) => {

  return fsp.readdir(pathToImgsDir)
    .then((dirsNames) => {
      return dirsNames.map((dirName) => {
        return path.join(pathToImgsDir, dirName);
      })
    })

};


const makeFilesPaths = (dirsPaths) => {
  // console.log('makeFilesPathsArray', dirsPathsArray)

  const promises = dirsPaths
    .map((pathToDir) => {
      return fsp.readdir(pathToDir)
        .then((files) => {
          return files.map(fileName => {
            return path.join(pathToDir, fileName);
          })
        })
    })

  return Promise.all(promises)
    .then((result) => result.flat())
    .catch((e) => {
      console.log('catch err:', e.message);
    })

};


export { makeDirsPaths, makeFilesPaths };
