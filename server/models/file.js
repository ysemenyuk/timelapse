import mongoose from 'mongoose';

const FileSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: mongoose.ObjectId, ref: 'User' },
  camera: { type: mongoose.ObjectId, ref: 'Camera' },
  parent: { type: mongoose.ObjectId, ref: 'Folder' },
  original: { type: String }, // file name original size
  preview: { type: String }, // file name small size
});

const File = mongoose.model('File', FileSchema);

export default File;
