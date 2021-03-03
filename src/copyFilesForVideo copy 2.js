import fs from 'fs';
import path from 'path';

import { makeNum } from './utils.js'

const fsp = fs.promises;

const copyFilesForVideo = (filesPathsArray, pathToOutDir, time = 60, fps = 25) => {
  // console.log('array', array)
  const all = filesPathsArray.length
  const toAdd = 10 * fps
  const toSkeep = all - toAdd

  console.log('all', all)
  console.log('toAdd', toAdd)
  console.log('toSkeep', toSkeep)

  console.log('all / toAdd', all / toAdd)
  console.log('all / toSkeep', all / toSkeep)

  let addStep
  let scipStep
 
  if (toAdd > all) {
    addStep = 1
    scipStep = 0

  } else if (toAdd < all && toAdd > toSkeep) {
    addStep = 1
    scipStep = Math.round(all / toSkeep)

  } else if (toAdd < all  && toAdd < toSkeep) {
    addStep = Math.round(all / toAdd)
    scipStep = 0

  }
 
  console.log('addStep', addStep)
  console.log('scipStep', scipStep)

  let countName = 0
  let countAddStep = 1;
  let countScipStep = 1;

  const promises = filesPathsArray
    .map((filePath) => {

      if (countAddStep === addStep && countScipStep !== scipStep) {
        countAddStep = 1;
        countScipStep += 1;

        const fileName = `img-${makeNum(countName)}.jpg`;
        const outputPath = path.join(pathToOutDir, fileName);
        countName += 1;
        return fsp.copyFile(filePath, outputPath);

      } else if (countAddStep === addStep && countScipStep === scipStep) {
        countScipStep = 1;
        return null
      } else if (countAddStep !== addStep && countScipStep !== scipStep) {
        countAddStep += 1
        return null
      }

    })
    .filter(item => item)
  
  console.log('total files', promises.length)
    
  return Promise.all(promises)
    .catch((e) => {
      console.log('catch err:', e.message);
    })
};

export default copyFilesForVideo;
