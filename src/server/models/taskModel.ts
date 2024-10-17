import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  reward: { type: Number, required: true }
});

export const TaskModel = mongoose.model('Task', taskSchema);