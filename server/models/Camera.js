import mongoose from 'mongoose';

const CameraSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  screenshotLink: { type: String, default: '' },
  user: { type: mongoose.ObjectId, ref: 'User' },
  avatar: { type: mongoose.ObjectId, ref: 'CameraFile' },
  mainFolder: { type: mongoose.ObjectId, ref: 'CameraFile' },
  imagesFolder: { type: mongoose.ObjectId, ref: 'CameraFile' },
  imagesByTimeFolder: { type: mongoose.ObjectId, ref: 'CameraFile' },
  videosFolder: { type: mongoose.ObjectId, ref: 'CameraFile' },
  videosByTimeFolder: { type: mongoose.ObjectId, ref: 'CameraFile' },
  imagesByTimeTask: { type: mongoose.ObjectId, ref: 'Task' },
  videosByTimeTask: { type: mongoose.ObjectId, ref: 'Task' },
});

const Camera = mongoose.model('Camera', CameraSchema);

export default Camera;
