import mongoose from 'mongoose';

// console.log('cameraModel');

const ScreenshotByTimeSchema = mongoose.Schema({
  user: { type: mongoose.ObjectId, ref: 'User' },
  camera: { type: mongoose.ObjectId, ref: 'Camera' },
  status: { type: String, default: '' },
  interval: { type: String, default: '' },
  startTime: { type: String, default: '' },
  stopTime: { type: String, default: '' },
});

const ScreenshotByTime = mongoose.model('ScreenshotByTime', ScreenshotByTimeSchema);

export default ScreenshotByTime;
