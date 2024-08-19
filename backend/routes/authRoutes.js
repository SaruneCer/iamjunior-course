const express = require('express');
const User = require('../schemas/User');
const router = express.Router();
const { generateToken } = require('../utils/password');

router.post('/register', async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: 'User exists' });
    }
    const newUser = new User(user);
    await newUser.save();
    return res.status.apply(200).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = req.body;

    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isCorrectPassword = await existingUser.isCorrectPassword(user.password);
    if (!isCorrectPassword) {
      return res.status(404).json({ message: 'Invalid password' });
    }

    const token = generateToken({ id: existingUser._id });

    return res.json({ message: 'Logged in', token, existingUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error loging in user', error: error.message });
  }
});

module.exports = router;
