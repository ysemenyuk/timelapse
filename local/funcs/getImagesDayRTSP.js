import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

import {
  parseTime, makeTodayName, makeFileName, dd,
} from './utils.js';

const fsp = fs.promises;
const execp = util.promisify(exec);

// save images from rtsp with interval

const getImagesByTime = (settings) => {
  const {
    rtspUrl, jpegIntervalDay, startRecordTime, stopRecordTime, pathToImagesDir,
  } = settings;

  setTimeout(() => getImagesByTime(settings), jpegIntervalDay);

  const time = new Date();
  const { hh, mm } = parseTime(time);

  const currentTime = `${dd(hh)}-${dd(mm)}`;

  if (currentTime < startRecordTime || currentTime > stopRecordTime) {
    return;
  }

  const dirName = makeTodayName(time);
  const pathToDir = path.join(pathToImagesDir, dirName);

  fsp.readdir(pathToDir)
    .catch(() => {
      console.log('make dir:', pathToDir);
      return fsp.mkdir(pathToDir);
    })
    .then(() => {
      const fileName = `img-${makeFileName(time)}.jpg`;
      const pathToFile = path.join(pathToDir, fileName);
      console.log('write file:', pathToFile);
      return execp(`ffmpeg -rtsp_transport tcp -i ${rtspUrl} -f image2 -frames:v 1 ${pathToFile}`);
    })
    // .then(({ stdout, stderr }) => {
    // console.log('stdout:', stdout);
    // console.log('stderr:', stderr);
    // })
    .catch((e) => {
      console.lod('error:', e.message);
    });
};

export default getImagesByTime;

// import { cam2 } from '../settings.js';
// getImagesByTime(cam2);
