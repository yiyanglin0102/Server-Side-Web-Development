const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Additional routes for updating user profile, etc.

module.exports = router;
