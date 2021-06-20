import mongoose from 'mongoose';

const FolderSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String },
  date: { type: Date, default: Date.now() },
  user: { type: mongoose.ObjectId, ref: 'User' },
  camera: { type: mongoose.ObjectId, ref: 'Camera' },
  parent: { type: mongoose.ObjectId, ref: 'Folder' },
});

const Folder = mongoose.model('Folder', FolderSchema);

export default Folder;
