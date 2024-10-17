import express from 'express';
import { UserModel } from '../models/userModel';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

router.post('/', async (req, res) => {
  const userData = req.body;

  try {
    const newUser = new UserModel(userData);
    const savedUser = await newUser.save();
    res.status(201).json({ id: savedUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

router.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const updateData = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    if (updatedUser) {
      res.json({ message: 'User updated successfully', user: updatedUser });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user data' });
  }
});

export const userRouter = router;