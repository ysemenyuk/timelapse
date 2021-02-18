import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

export const makeNum = (num) => {
  if (num < 10) {
    return `00000${num}`
  }
  if (num >= 10 && num < 100) {
  return `0000${num}`
  }
  if (num >= 100 && num < 1000) {
    return `000${num}`
  }
  if (num >= 1000 && num < 10000) {
    return `00${num}`
  }
  if (num >= 10000 && num < 100000) {
    return `0${num}`
  }
  return num;
};

export const msToTime = (duration) => {
  let milliseconds = parseInt((duration%1000))
  let seconds = parseInt((duration/1000)%60)
  let minutes = parseInt((duration/(1000*60))%60)
  let hours = parseInt((duration/(1000*60*60))%24);
  
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  
  return hours + ":" + minutes + ":" + seconds;
};

export const log = (pathToLogFile, message) => {
  console.log(new Date().toLocaleString(), message);
  fsp.appendFile(pathToLogFile, `${new Date().toLocaleString()} - ${message}\n`)
};
