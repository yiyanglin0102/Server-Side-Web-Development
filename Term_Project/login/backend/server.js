const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
require('./config/passport')(passport);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
app.post('/register', (req, res) => {
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


app.post('/login', (req, res) => {
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


// Protected route example for fetching user events
app.get('/events', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(req.user.events);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.post('/events', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { title, description, startDate, endDate } = req.body;

    const newEvent = {
        title: title,
        description: description,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
    };

    User.findById(req.user.id).then(user => {
        user.events.push(newEvent);
        user.save().then(user => res.json(newEvent)).catch(err => res.status(500).json({ message: 'Error saving event.' }));
    });
});