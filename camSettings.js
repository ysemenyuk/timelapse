const dd = (num) => num < 10 ? `0${num}` : `${num}`;

// const recordInterval = 5 * 1000;
// const startRecordTime = '08-00';
// const stopRecordTime = '20-00';
// const timeForMakeVideo = '23-00';
// const jpegUrl = "http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG"

export const cam1Settings = {
  camName: 'cam1',
  recordInterval: 5 * 1000,
  startRecordTime: '08-00',
  stopRecordTime: '20-00',
  timeForMakeVideo: '23-00',
  jpegUrl: "http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG",
}
