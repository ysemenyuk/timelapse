import axios from 'axios';
import fs from 'fs';
import path from 'path';

import getImgFromUrl from './getImgFromUrl.js';
import makeVideoFile from './makeVideoFile.js';
import concatVideos from './concatVideos.js';

import { makeNum, msToTime, log } from './utils.js'

const fsp = fs.promises;

const dd = (num) => num < 10 ? `0${num}` : `${num}`;

const recordInterval = 5 * 1000;

const startRecordTime = '08-00';
const stopRecordTime = '20-00';

const timeForMakeVideo = '23-00';

const pathToApp = 'D:/timelapse';
const logsDirName = 'logs';
const videosDirName = 'videos';
const imagesDirName = 'images'
const pathToVideoFiles = path.join(pathToApp, videosDirName);

const jpegUrl = "http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG"


const startCam = (name) => {

  const currentTime = new Date();

  const year = currentTime.getFullYear();
  const month = currentTime.getMonth();
  const date = currentTime.getDate();

  const dirName = `${year}${dd(month)}${dd(date)}`;
  const pathToDir = path.join(pathToApp, imagesDirName, dirName);

  const logFileName = `${dirName}-log.txt`
  const pathToLogFile = path.join(pathToApp, logsDirName, logFileName);

  const nextDay = new Date(year, month, date + 1, 1, 1);
  const startGetImages = new Date(year, month, date, 8, 1);
  const startMakeVideo = new Date(year, month, date, 22, 1);
  const startConcatVideos = new Date(year, month, date, 23, 1);

  setTimeout(() => startCam(name), nextDay - currentTime);
  
  setTimeout(() => {
    getImgFromUrl(pathToDir, pathToLogFile, jpegUrl, recordInterval, stopRecordTime)
  }, startGetImages - currentTime);

  setTimeout(() => {
    makeVideoFile(pathToDir, pathToVideoFiles, dirName, pathToLogFile)
  }, startMakeVideo - currentTime);

  setTimeout(() => {
    concatVideos(pathToVideoFiles, pathToApp, 'fullVideo', pathToLogFile)
  }, startConcatVideos - currentTime);

  console.log(`start ${name}`, currentTime.toLocaleString());

};

const app = () => {
  startCam('Cam1');
};

app();
