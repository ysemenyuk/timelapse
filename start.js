import axios from 'axios';
import fs from 'fs';
import path from 'path';

import makeVideo from './makeVideo.js';
import renameFiles from './renameFiles.js'

const fsp = fs.promises;


const dd = (num) => {
  return num < 10 ? `0${num}` : `${num}`
};

const recordInterval = 10000;
const sleepInterval = 60000;

const startRecordTime = '08-00';
const stopRecordTime = '20-00';

const jpegUrl = "http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG"


const sleep = (id) => {
  const time = new Date();
  const hh = dd(time.getHours());
  const mm = dd(time.getMinutes());

  const currentTime = `${hh}-${mm}`

  if (currentTime < startRecordTime || currentTime > stopRecordTime) {

    console.log('sleep', currentTime)
    const id = setTimeout(() => sleep(id), sleepInterval);

  } else {

    console.log('start record', currentTime)
    clearTimeout(id)    
    getImgWithInterval()

  }
};


const getImgWithInterval = (timerId) => {

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

  if (currentTime < startRecordTime) {

    console.log('setTimeout sleep before run')
    fsp.appendFile(pathToLogFile, `${current} - setTimeout sleep before run\n`)

    clearTimeout(timerId);
    const id = setTimeout(() => sleep(id), sleepInterval);

  } else if (currentTime > stopRecordTime) {

    console.log('setTimeout sleep after stop')
    fsp.appendFile(pathToLogFile, `${current} - setTimeout sleep after stop\n`)

    const id = setTimeout(() => sleep(id), sleepInterval);

    if (!timerId) {      
      return;
    }

    clearTimeout(timerId);

    console.log('rename files')
    fsp.appendFile(pathToLogFile, `${current} - rename files\n`)

    renameFiles(pathToDir)
      .then(() => {

        console.log('make video')
        fsp.appendFile(pathToLogFile, `${current} - make video\n`)

        makeVideo(pathToDir, pathToVideoFiles, dirName);
      })
    
   
  } else {

    // let count = 0

    fsp.readdir(pathToDir)
      // .then((files) => {
      //   const lastNum = files[files.length - 1].slice(-10, -4)
      //   // console.log(num, parseInt(num))
      //   count = parseInt(lastNum) + 1
      // })
      .catch((e) => {

        console.log('readdir err:', e.message)
        console.log('make dir:', pathToDir)
        fsp.appendFile(pathToLogFile, `${current} - make dir: ${pathToDir}\n`)
        // count = 0;
        return fsp.mkdir(pathToDir)
      })
      .then(() => axios.get(jpegUrl, { responseType: 'arraybuffer' }))
      .then((resp) => {
        const fileName = `img-${hh}${mm}${ss}.jpg`
        const pathToFile = path.join(pathToDir, fileName)

        console.log(pathToFile)
        fsp.appendFile(pathToLogFile, `${current} - write file: ${pathToFile}\n`)

        return fsp.writeFile(pathToFile, resp.data)
      })

      // .then((resp) => {
        
      //   const fileName = `img-${makeNum(count)}.jpg`
      //   // const fileName = `img-${hh}${mm}${ss}.jpg`

      //   const pathToFile = path.join(pathToDir, fileName)
      //   // console.log(fileName)
      //   console.log(pathToFile)

      //   return fsp.writeFile(pathToFile, resp.data)
      
      // })
      // .then(() => console.log('write file', pathToFile))
      // .then(() => fsp.appendFile(pathToLogFile, `${current} - write file: ${pathToFile}\n`))

      .catch((e) => {

        console.log('catch end error:', e.message)
        fsp.appendFile(pathToLogFile, `${current} - catch end error: ${e.message}\n`)

      })
      .finally(() => {
        const timerId = setTimeout(() => getImgWithInterval(timerId), recordInterval);
      })


  }

};

getImgWithInterval()
