import express from 'express';
import User from '../schemas/User'
import { generateToken } from '../utils/password';
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User exists' });
    }
    const newUser = new User(user);
    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = req.body as { email: string; password: string };

    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isCorrectPassword = await existingUser.isCorrectPassword(user.password);
    if (!isCorrectPassword) {
      return res.status(404).json({ message: 'Invalid password' });
    }

    const token = generateToken({ id: existingUser._id, email: existingUser.email });

    return res.json({ message: 'Logged in', token, existingUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in user', error: (error as Error).message });
  }
});

export default router;
