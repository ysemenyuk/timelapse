import mongoose from 'mongoose';

const UserFileSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: mongoose.ObjectId, ref: 'User' },
  type: { type: String },
});

const UserFile = mongoose.model('UserFile', UserFileSchema);

export default UserFile;
