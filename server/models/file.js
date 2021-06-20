import mongoose from 'mongoose';

const FileSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  date: { type: Date, default: Date.now() },
  user: { type: mongoose.ObjectId, ref: 'User' },
  camera: { type: mongoose.ObjectId, ref: 'Camera' },
  parent: { type: mongoose.ObjectId, ref: 'Folder' },
  original: { type: mongoose.ObjectId },
  preview: { type: mongoose.ObjectId },
});

const File = mongoose.model('File', FileSchema);

export default File;
