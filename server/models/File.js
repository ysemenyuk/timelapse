import mongoose from 'mongoose';

const FileSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: mongoose.ObjectId, ref: 'User' },
  camera: { type: mongoose.ObjectId, ref: 'Camera' },
  parent: { type: mongoose.ObjectId, ref: 'Folder' },
  storage: { type: String }, // disk, gridfs
  path: { type: String },
  type: { type: String }, // folder, image, screenshot, video
});

const File = mongoose.model('CameraFile', FileSchema);

export default File;
