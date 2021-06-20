import mongoose from 'mongoose';

// console.log('cameraModel');

const CameraSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.ObjectId, ref: 'User' },
  jpegLink: { type: String, default: '' },
  jpegCreateInterval: { type: String, default: '' },
  jpegCreateStartTime: { type: String, default: '' },
  jpegCreateStopTime: { type: String, default: '' },
});

const Camera = mongoose.model('Camera', CameraSchema);

export default Camera;
