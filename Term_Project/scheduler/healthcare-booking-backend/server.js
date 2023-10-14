const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const eventsRouter = require('./routes/events');  // Make sure you've set up routes/events.js as per previous instructions

const app = express();

// Connect to MongoDB (Using Mongoose)
mongoose.connect('mongodb://localhost:27017/eventScheduler', { useNewUrlParser: true, useUnifiedTopology: true });

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Use the events router
app.use('/events', eventsRouter);

// Handle errors
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err.message });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
