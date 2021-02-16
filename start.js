import axios from 'axios';
import fs from 'fs';
import path from 'path';

const fsp = fs.promises;

const rtspLink = "rtsp://admin:qwer1234@192.168.1.64:554/ISAPI/Streaming/Channels/101"

const jpegUrl = "http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG"
// const jpegUrl = "http://192.168.1.207:80/cam/realmonitor?channel=1&subtype=0&unicast=true&proto=Onvif"

// const filePath = path.resolve(fileName);

const getImgWithInterval = (url, interval) => {
  const nowTime = `${new Date().getHours()}-${new Date().getMinutes()}`
  const endTime = '18-42'

  // console.log(nowTime, endTime)

  if (nowTime >= endTime) {
    console.log('stop')
    clearInterval(interval);
    return;
  }

  axios.get(url, { responseType: 'arraybuffer' })
  .then((resp) => {
    // console.log(resp.status)
    const fileName = `${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}.jpg`
    const pathToFile = path.join('G:\\timelapse-16-02-20', fileName)
    // console.log(path.resolve())
    console.log(pathToFile)
  
    return fsp.writeFile(pathToFile, resp.data)
  })
  .catch((e) => console.log(e.message))
};

// getImgWithInterval(jpegUrl)
const interval = setInterval(() => getImgWithInterval(jpegUrl, interval), 5000);
