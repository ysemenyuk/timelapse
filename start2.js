import axios from 'axios';
import fs from 'fs';
import path from 'path';

import makeVideo from './makeVideo.js';
import makeVideo2 from './makeVideo2.js';

import makeNum from './utils.js'

const fsp = fs.promises;


const dd = (num) => {
  return num < 10 ? `0${num}` : `${num}`
};

const recordInterval = 10000;
const sleepInterval = 60000;

const startRecordTime = '08-00';
const stopRecordTime = '20-00';

const jpegUrl = "http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG"

const getImgWithInterval = () => {

  const time = new Date();

  const year = time.getFullYear();
  const month = dd(time.getMonth() + 1);
  const date = dd(time.getDate());
  const hh = dd(time.getHours());
  const mm = dd(time.getMinutes());
  const ss = dd(time.getSeconds());

  const current = `${year}.${month}.${date}--${hh}:${mm}:${ss}`
  // console.log('current:', current);
  
  const pathToLogFile = path.join('G:\\', `${year}${month}${date}-log.txt`)
  const pathToVideoFiles = 'G:\\';

  const dirName = `${year}${month}${date}`
  const pathToDir = path.join('G:\\', dirName)

  const currentTime = `${hh}-${mm}`
  // console.log('currentTime', currentTime)

  if (currentTime > stopRecordTime) {

    // console.log('setTimeout sleep after stop')
    // fsp.appendFile(pathToLogFile, `${current} - setTimeout sleep after stop\n`)
    // setTimeout(() => start(), sleepInterval);

    console.log('start make video', new Date().toLocaleString)
    fsp.appendFile(pathToLogFile, `${new Date().toLocaleString} - make video\n`)

    // makeVideo(pathToDir, pathToVideoFiles, dirName);

    makeVideo2(pathToDir, pathToVideoFiles, dirName)
      .then(() => {
        console.log('end make video', new Date().toLocaleString)
        fsp.appendFile(pathToLogFile, `${new Date().toLocaleString} - end make video\n`)
        console.log('setTimeout sleep after stop')
        fsp.appendFile(pathToLogFile, `${current} - setTimeout sleep after stop\n`)
        setTimeout(() => start(), sleepInterval);
      })
   
  } else {

    let count = 0

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

        console.log(pathToFile);
        fsp.appendFile(pathToLogFile, `${current} - write file: ${pathToFile}\n`);

        return fsp.writeFile(pathToFile, resp.data);
      })

      .catch((e) => {
        console.log('catch end error:', e.message)
        fsp.appendFile(pathToLogFile, `${current} - catch end error: ${e.message}\n`)
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

  const currentTime = `${hh}-${mm}`

  if (currentTime < startRecordTime || currentTime > stopRecordTime) {

    console.log('sleep', currentTime)
    setTimeout(() => start(), sleepInterval);

  } else {

    console.log('start record', currentTime)
    getImgWithInterval()

  }
};

start()
