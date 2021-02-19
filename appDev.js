import fs from 'fs';
import path from 'path';

import getImgFromUrl from './getImgFromUrl.js';
import makeVideoFile from './makeVideoFile.js';
import concatVideos from './concatVideos.js';

import { makeNum, msToTime, log } from './utils.js';
import { cam1Settings } from './camSettings.js';

const fsp = fs.promises;

const dd = (num) => num < 10 ? `0${num}` : `${num}`;


const pathToApp = path.resolve('../');
const logsDirName = 'logs';
const videosDirName = 'videos';
const imagesDirName = 'images'
const pathToVideoFiles = path.join(pathToApp, videosDirName);


const startCam = (settings, pathToCamDir) => {

  const { camName, recordInterval, startRecordTime, stopRecordTime, timeForMakeVideo, jpegUrl } = settings;

  const currentTime = new Date();

  const year = currentTime.getFullYear();
  const month = currentTime.getMonth();
  const date = currentTime.getDate();

  const dirName = `${year}${dd(month + 1)}${dd(date)}`;
  const pathToDir = path.join(pathToCamDir, imagesDirName, dirName);

  const logFileName = `${dirName}-log.txt`
  const pathToLogFile = path.join(pathToCamDir, logsDirName, logFileName);

  const nextDay = new Date(year, month, date + 1, 1, 1);
  const startGetImages = new Date(year, month, date, 8, 1);
  const startMakeVideo = new Date(year, month, date, 22, 1);
  const startConcatVideos = new Date(year, month, date, 23, 1);

  // console.log('currentTime', currentTime.toLocaleString());
  // console.log('nextDay', nextDay.toLocaleString());
  // console.log('startGetImages', startGetImages.toLocaleString());
  // console.log('startMakeVideo', startMakeVideo.toLocaleString());
  // console.log('startConcatVideos', startConcatVideos.toLocaleString());

  setTimeout(() => startCam(settings, pathToCamDir), nextDay - currentTime);
  
  setTimeout(() => {
    getImgFromUrl(pathToDir, pathToLogFile, jpegUrl, recordInterval, stopRecordTime)
  }, startGetImages - currentTime);

  setTimeout(() => {
    makeVideoFile(pathToDir, pathToVideoFiles, dirName, pathToLogFile)
  }, startMakeVideo - currentTime);

  setTimeout(() => {
    concatVideos(pathToVideoFiles, pathToCamDir, camName, pathToLogFile)
  }, startConcatVideos - currentTime);

};

const app = async () => {
  const { camName } = cam1Settings;
  const pathToCamDir = path.join(pathToApp, camName)

  console.log('pathToCamDir', pathToCamDir)

  try {
    await fsp.mkdir(pathToCamDir)
  } catch (err) {
    console.log(err.message)
  }

  try {
    await fsp.mkdir(path.join(pathToCamDir, logsDirName))
  } catch (err) {
    console.log(err.message)
  }

  try {
    await fsp.mkdir(path.join(pathToCamDir, videosDirName))
  } catch (err) {
    console.log(err.message)
  }

  try {  
    await fsp.mkdir(path.join(pathToCamDir, imagesDirName))
  } catch (err) {
    console.log(err.message)
  }

  console.log('got dirs')

  console.log(`start ${camName}`, (new Date()).toLocaleString());

  startCam(cam1Settings, pathToCamDir);
};

app();
