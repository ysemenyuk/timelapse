import axios from 'axios';
import fs from 'fs';
import path from 'path';

import { makeNum, msToTime, log } from './utils.js'

const fsp = fs.promises;

const dd = (num) => num < 10 ? `0${num}` : `${num}`;

const getImgFromUrl = (pathToDir, pathToLogFile, jpegUrl, recordInterval, stopRecordTime) => {

  const time = new Date();
  const hh = dd(time.getHours());
  const mm = dd(time.getMinutes());
  const currentTime = `${hh}-${mm}`;

  if (currentTime > stopRecordTime) {
    log(pathToLogFile, `stop record`);
    return;
  }

  setTimeout(() => getImgFromUrl(pathToDir, pathToLogFile, jpegUrl, recordInterval, stopRecordTime), recordInterval);

  let count = 0;

  fsp.readdir(pathToDir)
    .then((files) => {
      count = files.length ? files.length : 0;
    })
    .catch((e) => {
      log(pathToLogFile, `catch read dir error: ${e.message}`);
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

      log(pathToLogFile, `write file: ${pathToFile}`);
      return fsp.writeFile(pathToFile, resp.data);
    })
    .catch((e) => {
      log(pathToLogFile, `catch write file error: ${e.message}`);
    })

};

export default getImgFromUrl;
