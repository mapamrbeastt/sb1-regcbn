import express from 'express';
import { TaskModel } from '../models/taskModel';
import { UserModel } from '../models/userModel';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const tasks = await TaskModel.find({ userId: req.params.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

router.post('/', async (req, res) => {
  const taskData = req.body;

  try {
    const newTask = new TaskModel(taskData);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

router.put('/:taskId/complete', async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.completed) {
      return res.status(400).json({ message: 'Task already completed' });
    }

    task.completed = true;
    task.completedAt = new Date();
    await task.save();

    const user = await UserModel.findById(task.userId);
    if (user) {
      user.coins += task.reward;
      await user.save();
    }

    res.json({ message: 'Task completed successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error completing task' });
  }
});

export const taskRouter = router;