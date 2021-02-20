import fs from 'fs';
import path from 'path';

import getImgFromUrl from './getImgFromUrl.js';
import makeVideoFile from './makeVideoFile.js';
import concatVideos from './concatVideos.js';

import { makeNum, msToTime, log } from './utils.js';
import settings from './settings.js';

const { cams } = settings;
const fsp = fs.promises;

const dd = (num) => num < 10 ? `0${num}` : `${num}`;


const pathToApp = path.resolve('../');

const logsDirName = 'logs';
const videosDirName = 'videos';
const imagesDirName = 'images'


const startCam = (settings, paths) => {

  const { camName, jpegUrl, jpegInterval, startRecordTime, stopRecordTime, startMakeVideoTime } = settings;
  const { pathToCamDir, pathToimagesDir, pathToVideosDir, pathToLogFile } = paths;

  const currentTime = new Date();

  const year = currentTime.getFullYear();
  const month = currentTime.getMonth();
  const date = currentTime.getDate();

  const dirName = `${year}${dd(month + 1)}${dd(date)}`;
  const pathToDir = path.join(pathToimagesDir, dirName);

  const [srHour, srMin] = startRecordTime;
  const [smvHour, smvMin] = startMakeVideoTime;

  const nextDay = new Date(year, month, date + 1, 1, 1);
  const startGetImages = new Date(year, month, date, srHour, srMin);
  const startMakeVideo = new Date(year, month, date, smvHour, smvMin);
  // const startConcatVideos = new Date(year, month, date, 23, 1);

  console.log('currentTime', currentTime.toLocaleString());
  console.log('nextDay', nextDay.toLocaleString());
  console.log('startGetImages', startGetImages.toLocaleString());
  console.log('startMakeVideo', startMakeVideo.toLocaleString());
  // console.log('startConcatVideos', startConcatVideos.toLocaleString());

  setTimeout(() => startCam(settings, pathToCamDir), nextDay - currentTime);
  
  setTimeout(() => {
    getImgFromUrl(pathToDir, pathToLogFile, jpegUrl, jpegInterval, stopRecordTime)
  }, startGetImages - currentTime);

  setTimeout(() => {
    makeVideoFile(pathToDir, pathToVideosDir, dirName, pathToLogFile)
  }, startMakeVideo - currentTime);

  // setTimeout(() => {
  //   concatVideos(pathToVideosDir, pathToCamDir, camName, pathToLogFile)
  // }, startConcatVideos - currentTime);

};

const checkDir = (pathToDir) => {
  return fsp.readdir(pathToDir)
    .then(() => {
      console.log(`dir already exist: ${pathToDir}`);
    })
    .catch((e) => {
      console.log(`catch readdir error: ${e.message}`);
      console.log(`make dir: ${pathToDir}`);
      return fsp.mkdir(pathToDir);
    })
}


const app = async () => {
  const camSettings = cams[0];
  const { camName } = camSettings;

  const pathToCamDir = path.join(pathToApp, camName);
  const pathToimagesDir = path.join(pathToCamDir, imagesDirName);
  const pathToVideosDir = path.join(pathToCamDir, videosDirName);

  const logFileName = `${camName}-log.txt`
  const pathToLogFile = path.join(pathToCamDir, logFileName);

  const camPaths = { pathToCamDir, pathToimagesDir, pathToVideosDir, pathToLogFile };

  console.log('try start camera', camName)

  checkDir(pathToCamDir)
    .then(() => checkDir(pathToimagesDir))
    .then(() => checkDir(pathToVideosDir))
    .then(() => startCam(camSettings, camPaths))
    .catch((e) => {
      throw new Error(e);
    });

  // console.log(`started camera`, camName, (new Date()).toLocaleString());
};

app();
