import axios from 'axios';
import fs from 'fs';
import path from 'path';

import settings from './settings.js';
import { makeNum, log } from './utils.js'

const { cams } = settings;
const fsp = fs.promises;
const dd = (num) => num < 10 ? `0${num}` : `${num}`;


const getImgFromUrl = (pathToDir, pathToLogFile, jpegUrl, jpegInterval, stopRecordTime) => {

  const time = new Date();

  const hh = time.getHours();
  const mm = time.getMinutes();

  const [HH, MM] = stopRecordTime;

  const currentTime = [dd(hh), dd(mm)].join('');
  const stopTime = [dd(HH), dd(MM)].join('');

  if (currentTime >= stopTime) {
    log(pathToLogFile, `getImgFromUrl -- stop record`);
    return;
  }

  setTimeout(() => getImgFromUrl(pathToDir, pathToLogFile, jpegUrl, jpegInterval, stopRecordTime), jpegInterval);

  let count = 0;

  fsp.readdir(pathToDir)
    .then((files) => {
      count = files.length ? files.length : 0;
    })
    .catch((e) => {
      log(pathToLogFile, `catch readdir error: ${e.message}`);
      log(pathToLogFile, `make dir: ${pathToDir}`);

      count = 0;
      return fsp.mkdir(pathToDir);
    })
    .then(() => {
      return axios.get(jpegUrl, { responseType: 'arraybuffer' })
    })
    .then((resp) => {
      const fileName = `img-${makeNum(count)}.jpg`;
      const pathToFile = path.join(pathToDir, fileName);

      console.log(`write file: ${pathToFile}`);

      // log(pathToLogFile, `write file: ${pathToFile}`);
      return fsp.writeFile(pathToFile, resp.data);
    })
    .catch((e) => {
      log(pathToLogFile, `catch write file error: ${e.message}`);
    })

};

export default getImgFromUrl;

// const { jpegUrl, jpegInterval, stopRecordTime } = cams[0];
// const pathToApp = path.resolve('../');
// const pathToCamDir = path.join(pathToApp, 'cam1')

// const pathToDir = path.join(pathToCamDir, 'images', '20210220');
// const pathToLogFile = path.join(pathToCamDir, 'test-log.txt');

// getImgFromUrl(pathToDir, pathToLogFile, jpegUrl, jpegInterval, stopRecordTime)
