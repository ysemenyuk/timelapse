import axios from 'axios';
import fs from 'fs';
import path from 'path';

import { makeTodayName, makeMonthName, makeFileName, makeNum, logger, dd } from './utils.js'

const fsp = fs.promises;


// save images from url with interval

const getImagesByTime = (settings) => {

  const { jpegUrl, jpegIntervalMonth, startRecordTime, stopRecordTime, pathToImagesDir, pathToLogFile } = settings;

  setTimeout(() => getImgagesByTime(settings), jpegIntervalMonth);

  const time = new Date();
  const { hh, mm } = parseTime(time)

  const currentTime = `${dd(hh)}-${dd(mm)}`;

  if (currentTime < startRecordTime || currentTime > stopRecordTime) {
    return;
  } else {

    const dirName = makeMonthName(time);
    const pathToDir = path.join(pathToImagesDir, dirName);

    // let count = 0;

    fsp.readdir(pathToDir)
      // .then((files) => {
      //   count = files.length ? files.length : 0;
      // })
      .catch((e) => {
        logger(`catch read dir error: ${e.message}`, pathToLogFile);
        logger(`make dir: ${pathToDir}`, pathToLogFile);

        // count = 0;
        return fsp.mkdir(pathToDir);
      })
      .then(() => {
        return axios.get(jpegUrl, { responseType: 'arraybuffer' })
      })
      .then((resp) => {
        // const fileName = `img-${makeNum(count)}.jpg`;
        const fileName = `img-${makeFileName(time)}.jpg`;
        const pathToFile = path.join(pathToDir, fileName);

        console.log(`write file: ${pathToFile}`);
        // logger(`write file: ${pathToFile}`, pathToLogFile);
        
        return fsp.writeFile(pathToFile, resp.data);
      })
      .catch((e) => {
        if (e.isAxiosError) {
          logger(`catch request error: ${e.message}`, pathToLogFile);
        } else {
          logger(`catch write file error: ${e.message}`, pathToLogFile);
        }
      })

  }

  
};

export default getImagesByTime;


// import { cam1 } from './settings.js';
// getImagesByTime(cam1);
