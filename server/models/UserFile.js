import mongoose from 'mongoose';

const UserFileSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: mongoose.ObjectId, ref: 'User' },
  type: { type: String },
  fileId: { type: mongoose.ObjectId },
});

const UserFile = mongoose.model('UserFile', UserFileSchema);

export default UserFile;
