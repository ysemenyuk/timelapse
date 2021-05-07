import path from 'path';

const pathToApp = path.resolve('../');

const makeCam1 = () => {
  const pathToCamDir = path.join(pathToApp, 'camera1');
  const pathToImagesDir = path.join(pathToCamDir, 'images');
  const pathToVideosDir = path.join(pathToCamDir, 'videos');
  const pathToLogFile = path.join(pathToCamDir, 'camera1-log.txt');

  return {
    camName: 'camera1',
    jpegUrl:
      'http://admin:qwer1234@192.168.127.180:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG',
    jpegIntervalMonth: 1000 * 60,
    jpegIntervalDay: 1000 * 20,
    startRecordTime: '07-00',
    stopRecordTime: '19-00',
    pathToCamDir,
    pathToImagesDir,
    pathToVideosDir,
    pathToLogFile,
  };
};

export const cam1 = makeCam1();
