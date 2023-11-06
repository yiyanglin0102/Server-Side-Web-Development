const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username }).then(user => {
        if (!user) return res.status(404).json({ message: 'User not found' });

        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

            const payload = { id: user.id, username: user.username };
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                res.json({ success: true, token: 'Bearer ' + token });
            });
        });
    });
});

module.exports = router;
