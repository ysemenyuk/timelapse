import mongoose from 'mongoose';

const CameraFolderSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: mongoose.ObjectId, ref: 'User' },
  camera: { type: mongoose.ObjectId, ref: 'Camera' },
  parent: { type: mongoose.ObjectId, ref: 'Folder' },
});

const CameraFolder = mongoose.model('CameraFolder', CameraFolderSchema);

export default CameraFolder;
