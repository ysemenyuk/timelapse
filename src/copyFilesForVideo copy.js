import fs from 'fs';
import path from 'path';

import { makeNum } from './utils.js'

const fsp = fs.promises;

const copyFilesForVideo = (filesPathsArray, pathToOutDir, time = 60, fps = 25) => {
  // console.log('array', array)
  const all = filesPathsArray.length
  const toAdd = 30 * fps

  console.log('all', all)
  console.log('toAdd', toAdd)

  console.log('all / toAdd', all / toAdd)

  let step

  if (toAdd > all) {
    step = 1
  } else {
    step = Math.round(all / toAdd)
  }

  const out = all / step
  const outSeconds = out / fps

  console.log('step', step)

  console.log('out files', out)
  console.log('out seconds', outSeconds)

  let countName = 0
  let countStep = 1;

  const promises = filesPathsArray
    .map((filePath) => {
      if (countStep === step) {
        countStep = 1;

        const fileName = `img-${makeNum(countName)}.jpg`;
        const outputPath = path.join(pathToOutDir, fileName);
        countName += 1;
        return fsp.copyFile(filePath, outputPath);
      } else {
        countStep += 1;
        return null;
      }
    })
    .filter(item => item)
    
  return Promise.all(promises)
    .catch((e) => {
      console.log('catch err:', e.message);
    })
};

export default copyFilesForVideo;
