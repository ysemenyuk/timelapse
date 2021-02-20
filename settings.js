const dd = (num) => num < 10 ? `0${num}` : `${num}`;

export default {
  cams: [
    {
      camName: 'camera1',
      jpegUrl: "http://admin:qwer1234@192.168.1.64:80/ISAPI/Streaming/Channels/101/picture?snapShotImageType=JPEG",
      jpegInterval: 10 * 1000,
      startRecordTime: [8, 1],
      stopRecordTime: [20, 1],
      startMakeVideoTime: [23, 1],
    },
  ]
}
