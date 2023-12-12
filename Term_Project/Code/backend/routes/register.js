// routes/register.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }).then(user => {
        if (user) return res.status(400).json({ message: 'Username already exists' });

        const newUser = new User({
            username: username
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => res.status(400).json(err));
            });
        });
    });
});

module.exports = router;
