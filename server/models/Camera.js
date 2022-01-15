import mongoose from 'mongoose';

const CameraSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  screenshotLink: { type: String, default: '' },
  user: { type: mongoose.ObjectId, ref: 'User' },
  avatar: { type: String, default: '' },
  mainFolder: { type: mongoose.ObjectId, ref: 'Folder' },
  screenshotsFolder: { type: mongoose.ObjectId, ref: 'Folder' },
  imagesFolder: { type: mongoose.ObjectId, ref: 'Folder' },
  videosFolder: { type: mongoose.ObjectId, ref: 'Folder' },
});

const Camera = mongoose.model('Camera', CameraSchema);

export default Camera;
