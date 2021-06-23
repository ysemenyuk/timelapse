import mongoose from 'mongoose';

// console.log('cameraModel');

const TaskSchema = mongoose.Schema({
  user: { type: mongoose.ObjectId, ref: 'User' },
  camera: { type: mongoose.ObjectId, ref: 'Camera' },
  type: { type: String, default: '' },
  status: { type: String, default: '' },
  interval: { type: String, default: '' },
  startTime: { type: String, default: '' },
  stopTime: { type: String, default: '' },
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
