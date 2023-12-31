const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const eventsRouter = require('./routes/events');
const patientsRouter = require('./routes/patients');
const mailsRouter = require('./routes/mails');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const imagesRouter = require('./routes/images');

require('dotenv').config();

const app = express();
const PORT = 3001;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

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
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/events', eventsRouter);
app.use('/patients', patientsRouter);
app.use('/mails', mailsRouter);
app.use('/images', imagesRouter);
