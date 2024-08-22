import express, { Request, Response } from 'express';
import User from '../schemas/User'; 
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({
      message: 'Error creating user',
      error: (err as Error).message,
    });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching users',
      error: (err as Error).message,
    });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({
      message: 'Error updating user',
      error: (err as Error).message,
    });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      message: 'User deleted successfully',
      deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting user',
      error: (err as Error).message,
    });
  }
});

export default router;
