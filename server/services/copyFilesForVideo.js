import fs from 'fs';
import path from 'path';

import { makeNum } from './utils.js';

const fsp = fs.promises;

const copyFile = (filePath, pathToOutDir, countName) => {
  const fileName = `img-${makeNum(countName)}.jpg`;
  const outputPath = path.join(pathToOutDir, fileName);
  return fsp.copyFile(filePath, outputPath);
};

const copyFilesForVideo = (filesPaths, pathToOutDir, time = 60, fps = 25) => {
  const all = filesPaths.length;
  const toAdd = time * fps;
  const toSkeep = all - toAdd;

  console.log('all', all);
  console.log('toAdd', toAdd);
  console.log('toSkeep', toSkeep);

  // console.log('all / toAdd', all / toAdd)
  // console.log('all / toSkeep', all / toSkeep)

  let promises;
  let countName = 0;

  if (toAdd > all) {
    promises = filesPaths
      .map((filePath) => {
        countName += 1;
        return copyFile(filePath, pathToOutDir, countName);
      });
  } else if (toAdd < all && toAdd > toSkeep) {
    const scipStep = Math.round(all / toSkeep);
    console.log('scipStep', scipStep);

    let countScip = 1;

    promises = filesPaths
      .map((filePath) => {
        if (countScip !== scipStep) {
          countScip += 1;
          countName += 1;
          return copyFile(filePath, pathToOutDir, countName);
        }
        countScip = 1;
        return null;
      });
  } else if (toAdd < all && toAdd < toSkeep) {
    const addStep = Math.round(all / toAdd);
    console.log('addStep', addStep);

    let countAdd = 1;

    promises = filesPaths
      .map((filePath) => {
        if (countAdd === addStep) {
          countAdd = 1;
          countName += 1;
          return copyFile(filePath, pathToOutDir, countName);
        }
        countAdd += 1;
        return null;
      });
  }

  console.log('total files', promises.filter((item) => item).length);

  return Promise.all(promises.filter((item) => item))
    .catch((e) => {
      console.log('catch err:', e.message);
    });
};

export default copyFilesForVideo;
