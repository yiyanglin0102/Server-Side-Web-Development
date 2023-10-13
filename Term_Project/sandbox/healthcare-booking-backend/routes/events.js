const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Importing the Event model to interact with the database.

// Endpoint to fetch all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find(); // Fetch all events from the database.
        res.json(events);
        console.log(events)
    } catch (err) {
        res.status(500).json({ message: err.message }); // Return error if any.
    }
});

// Endpoint to create a new event
router.post('/', async (req, res) => {
    const newEvent = new Event({
        title: req.body.title,
        start: req.body.start,
        end: req.body.end
    });

    try {
        const savedEvent = await newEvent.save(); // Save the new event to the database.
        res.status(201).json(savedEvent); // Return the saved event data.
    } catch (err) {
        res.status(400).json({ message: err.message }); // Return error if any.
    }
});

module.exports = router;
