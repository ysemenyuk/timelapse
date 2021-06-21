import mongoose from 'mongoose';

const AvatarSchema = mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  user: { type: mongoose.ObjectId, ref: 'User' },
  original: { type: String },
  preview: { type: String },
});

const Avatar = mongoose.model('Avatar', AvatarSchema);

export default Avatar;
