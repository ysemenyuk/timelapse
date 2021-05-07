import fs from 'fs';
import path from 'path';

import { makeNum } from './utils.js';

const fsp = fs.promises;

const renameFiles = (pathToSrcDir, pathToOutDir = pathToSrcDir) => fsp.readdir(pathToSrcDir)
  .then((files) => {
    const arr = files.map((name, index) => {
      const newName = `img-${makeNum(index)}${path.extname(name)}`;
      const input = path.join(pathToSrcDir, name);
      const output = path.join(pathToOutDir, newName);
      return fsp.rename(input, output);
    });
    return Promise.all(arr);
  })
  .catch((e) => {
    console.log('catch rename err:', e.message);
  });

// const pathToSrcDir = path.join('G:\\', 'timelapse', 'camera1', 'images', '2021-02-28')
// const pathToOutDir = path.join('G:\\', 'renamed')

// renameFiles(pathToSrcDir);

export default renameFiles;
