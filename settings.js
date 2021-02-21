import path from 'path';

const pathToApp = path.resolve('../');

const pathToCamDir = path.join(pathToApp, 'camera1');
const pathToImagesDir = path.join(pathToCamDir, 'images');
const pathToVideosDir = path.join(pathToCamDir, 'videos');
const pathToLogFile = path.join(pathToCamDir, 'camera1-log.txt');

export const cam1 = {
      camName: 'camera1',
      jpegUrl: "http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG",
      jpegInterval: 1000 * 10,
      startRecordTime: '08-00',
      stopRecordTime: '20-00',
      pathToCamDir,
      pathToImagesDir,
      pathToVideosDir,
      pathToLogFile,
};

export const cam2 = {
  camName: 'camera2',
  
};
