import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  name: { type: String, required: true, default: 'username' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'no_img.jpg' },
});

const File = mongoose.model('User', UserSchema);

export default File;
