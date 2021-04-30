import path from 'path';

const pathToApp = path.resolve('../');

const makeCam1 = () => {
  const pathToCamDir = path.join(pathToApp, 'camera1');
  const pathToImagesDir = path.join(pathToCamDir, 'images');
  const pathToVideosDir = path.join(pathToCamDir, 'videos');
  const pathToLogFile = path.join(pathToCamDir, 'camera1-log.txt');

  return {
        camName: 'camera1',
        jpegUrl: "http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG",
        jpegIntervalMonth: 1000 * 60,
        jpegIntervalDay: 1000 * 5,
        startRecordTime: '07-00',
        stopRecordTime: '19-00',
        pathToCamDir,
        pathToImagesDir,
        pathToVideosDir,
        pathToLogFile,
    }
};

export const cam1 = makeCam1();

const makeCam2 = () => {
  const pathToCamDir = path.join(pathToApp, 'camera2');
  const pathToImagesDir = path.join(pathToCamDir, 'images');
  const pathToVideosDir = path.join(pathToCamDir, 'videos');
  const pathToLogFile = path.join(pathToCamDir, 'camera2-log.txt');

  return {
        camName: 'camera2',
        jpegUrl: 'http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG',
        rtspUrl: 'rtsp://admin:qwer1234@192.168.1.64:554/ISAPI/Streaming/Channels/101',
        jpegIntervalMonth: 1000 * 60,
        jpegIntervalDay: 1000 * 10,
        startRecordTime: '07-00',
        stopRecordTime: '19-00',
        pathToCamDir,
        pathToImagesDir,
        pathToVideosDir,
        pathToLogFile,
    }
};

export const cam2 = makeCam2();

const makeCam3 = () => {
  const pathToCamDir = path.join(pathToApp, 'camera3');
  const pathToImagesDir = path.join(pathToCamDir, 'images');
  const pathToVideosDir = path.join(pathToCamDir, 'videos');
  const pathToLogFile = path.join(pathToCamDir, 'camera3-log.txt');

  return {
        camName: 'camera3',
        jpegUrl: 'http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG',
        rtspUrl: 'rtsp://admin:qwer1234@192.168.1.64:554/ISAPI/Streaming/Channels/101',
        jpegIntervalMonth: 1000 * 60,
        jpegIntervalDay: 1000 * 10,
        startRecordTime: '07-00',
        stopRecordTime: '19-00',
        pathToCamDir,
        pathToImagesDir,
        pathToVideosDir,
        pathToLogFile,
    }
};

export const cam3 = makeCam3();