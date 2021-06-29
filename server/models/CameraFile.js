import mongoose from 'mongoose';

const CameraFileSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: mongoose.ObjectId, ref: 'User' },
  camera: { type: mongoose.ObjectId, ref: 'Camera' },
  parent: { type: mongoose.ObjectId, ref: 'Folder' },
  // original: { name: { type: String }, file: { type: mongoose.ObjectId } }, // file name original size
  // preview: { name: { type: String }, file: { type: mongoose.ObjectId } }, // file name small size
  original: { type: String }, // file name original size
  preview: { type: String }, // file name small size
});

const CameraFile = mongoose.model('CameraFile', CameraFileSchema);

export default CameraFile;
