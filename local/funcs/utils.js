import fs from 'fs';

const fsp = fs.promises;

export const dd = (num) => (num < 10 ? `0${num}` : `${num}`);

export const parseTime = (time) => {
  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();
  const hh = time.getHours();
  const mm = time.getMinutes();
  const ss = time.getSeconds();

  return {
    year, month, date, hh, mm, ss,
  };
};

export const makeTodayName = (time) => {
  const { year, month, date } = parseTime(time);
  return `${year}-${dd(month + 1)}-${dd(date)}`;
};

export const makeMonthName = (time) => {
  const { year, month } = parseTime(time);
  return `${year}-${dd(month + 1)}`;
};

export const makeFileName = (time) => {
  const {
    year, month, date, hh, mm, ss,
  } = parseTime(time);
  return `${year}-${dd(month + 1)}-${dd(date)}--${dd(hh)}-${dd(mm)}-${dd(ss)}`;
};

export const makeNum = (num) => {
  if (num < 10) {
    return `00000${num}`;
  }
  if (num >= 10 && num < 100) {
    return `0000${num}`;
  }
  if (num >= 100 && num < 1000) {
    return `000${num}`;
  }
  if (num >= 1000 && num < 10000) {
    return `00${num}`;
  }
  if (num >= 10000 && num < 100000) {
    return `0${num}`;
  }
  return num;
};

// export const msToTime = (duration) => {
//   let milliseconds = parseInt((duration%1000))
//   let seconds = parseInt((duration/1000)%60)
//   let minutes = parseInt((duration/(1000*60))%60)
//   let hours = parseInt((duration/(1000*60*60))%24);

//   hours = (hours < 10) ? "0" + hours : hours;
//   minutes = (minutes < 10) ? "0" + minutes : minutes;
//   seconds = (seconds < 10) ? "0" + seconds : seconds;

//   return hours + ":" + minutes + ":" + seconds;
// };

export const logger = (message, pathToLogFile) => {
  console.log(new Date().toLocaleString(), message);

  if (pathToLogFile) {
    fsp.appendFile(pathToLogFile, `${new Date().toLocaleString()} - ${message}\n`);
  }
};
