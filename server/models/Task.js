import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema({
  name: { type: String },
  type: { type: String },
  status: { type: String },
  user: { type: mongoose.ObjectId, ref: 'User' },
  camera: { type: mongoose.ObjectId, ref: 'Camera' },
  job: { type: mongoose.ObjectId },
  data: {
    interval: { type: String },
    startTime: { type: String },
    stopTime: { type: String },
  },
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
