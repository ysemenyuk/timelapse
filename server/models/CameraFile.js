import mongoose from 'mongoose';

const CameraFileSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: mongoose.ObjectId, ref: 'User' },
  camera: { type: mongoose.ObjectId, ref: 'Camera' },
  parent: { type: mongoose.ObjectId, ref: 'Folder' },
  storage: { type: String },
  path: { type: String },
});

const CameraFile = mongoose.model('CameraFile', CameraFileSchema);

export default CameraFile;
