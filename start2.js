import axios from 'axios';
import fs from 'fs';
import path from 'path';

import makeVideoFile from './makeVideo.js';
import makeVideoFile2 from './makeVideo2.js';

import { makeNum, msToTime } from './utils.js'

const fsp = fs.promises;

const dd = (num) => num < 10 ? `0${num}` : `${num}`;

const recordInterval = 5 * 1000;
const sleepInterval = 60 * 1000;

const startRecordTime = '08-00';
const stopRecordTime = '20-00';

const pathToApp = 'G:\\timelapse';

const jpegUrl = "http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG"



const getImgWithInterval = () => {

  const time = new Date();

  const year = time.getFullYear();
  const month = dd(time.getMonth() + 1);
  const date = dd(time.getDate());
  const hh = dd(time.getHours());
  const mm = dd(time.getMinutes());
  const ss = dd(time.getSeconds());

  const current = `${year}.${month}.${date}--${hh}:${mm}:${ss}`;
  // console.log('current:', current);
  
  const pathToLogFile = path.join(pathToApp, 'logs', `${year}${month}${date}-log.txt`);
  const pathToVideoFiles = path.join(pathToApp, `videos`);

  const dirName = `${year}${month}${date}`;
  const pathToDir = path.join(pathToApp, 'images', dirName);

  const currentTime = `${hh}-${mm}`;
  // console.log('currentTime', currentTime)

  if (currentTime > stopRecordTime) {

    console.log('stop record');
    fsp.appendFile(pathToLogFile, `${new Date().toLocaleString()} - stop record\n`);

    console.log('start make video', new Date().toLocaleString());
    fsp.appendFile(pathToLogFile, `${new Date().toLocaleString()} - make video\n`);

    makeVideoFile2(pathToDir, pathToVideoFiles, dirName)
      .then(() => {
        console.log('end make video', new Date().toLocaleString());
        fsp.appendFile(pathToLogFile, `${new Date().toLocaleString()} - end make video\n`);
      })
      .catch((e) => {
        console.log('catch make video error:', e.message);
        fsp.appendFile(pathToLogFile, `${new Date().toLocaleString()} - catch make video error: ${e.message}\n`);
      })
      .finally(() => {
        setTimeout(() => start(), sleepInterval);
      })
   
  } else {

    let count = 0;

    fsp.readdir(pathToDir)

      .then((files) => {
        count = files.length ? files.length : 0;
      })

      .catch((e) => {
        console.log('read dir err:', e.message);
        console.log('make dir:', pathToDir);
        fsp.appendFile(pathToLogFile, `${current} - make dir: ${pathToDir}\n`);

        count = 0;
        return fsp.mkdir(pathToDir);
      })

      .then(() => axios.get(jpegUrl, { responseType: 'arraybuffer' }))

      .then((resp) => {
        const fileName = `img-${makeNum(count)}.jpg`;
        const pathToFile = path.join(pathToDir, fileName);

        console.log('write file:',pathToFile);
        fsp.appendFile(pathToLogFile, `${current} - write file: ${pathToFile}\n`);

        return fsp.writeFile(pathToFile, resp.data);
      })

      .catch((e) => {
        console.log('catch write file error:', e.message);
        fsp.appendFile(pathToLogFile, `${current} - catch write file error: ${e.message}\n`);
      })

      .finally(() => {
        setTimeout(() => getImgWithInterval(), recordInterval);
      })

  }

};

const start = () => {

  const time = new Date();
  const hh = dd(time.getHours());
  const mm = dd(time.getMinutes());

  const currentTime = `${hh}-${mm}`;



  if (currentTime < startRecordTime) {

    const nextTime = new Date(time.getFullYear(), time.getMonth(), time.getDate(), 8, 0);

    console.log('time', time.toLocaleString());
    console.log('next start', nextTime.toLocaleString());
    console.log('time to start', msToTime(nextTime - time));

    // console.log('sleep', time.toLocaleString());
    setTimeout(() => start(), sleepInterval);
    return;
  }

  if (currentTime > stopRecordTime) {

    const nextTime = new Date(time.getFullYear(), time.getMonth(), time.getDate() + 1, 8, 0);

    console.log('time', time.toLocaleString());
    console.log('next start', nextTime.toLocaleString());
    console.log('time to start', msToTime(nextTime - time));

    // console.log('sleep', time.toLocaleString())
    setTimeout(() => start(), sleepInterval);
    return;
  } 

  console.log('start record', time.toLocaleString());
  getImgWithInterval();

};

start();
