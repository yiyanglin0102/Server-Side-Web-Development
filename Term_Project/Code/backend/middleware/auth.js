// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).send('User already exists');

  const user = new User({ username, password: new User().hashPassword(password) });
  await user.save();

  res.send('User registered successfully');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('User not found');

  if (!user.comparePassword(password, user.password)) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: user._id }, 'SECRET_KEY', { expiresIn: '1h' });
  res.send({ token });
});

module.exports = router;
