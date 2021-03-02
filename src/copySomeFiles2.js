import fs from 'fs';
import path from 'path';

import copySomeFiles from './copySomeFiles.js';

const fsp = fs.promises;

const copySomeFiles2 = (pathToSrcDir, pathToOutDir, num = 1) => {
  
 return fsp.readdir(pathToSrcDir)
  .then(dirs => {
    const dirsArray = dirs.map(dir => {
      const pathToDir = path.join(pathToSrcDir, dir)
      return copySomeFiles(pathToDir, pathToOutDir, num)
    })
    return Promise.all(dirsArray);
  })
  .catch((e) => {
    console.log('catch err:', e.message)
  })

};

export default copySomeFiles2;

// const pathToSrcDir = path.join('G:\\', 'timelapse', 'camera1', 'images')
// const pathToOutDir = path.join('G:\\', 'timelapse', 'camera1', 'images', 'tmp')

// copySomeFiles2(pathToSrcDir, pathToOutDir, 10);
