// routes/events.js

const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Importing the Event model to interact with the database.

// Endpoint to fetch all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find(); // Fetch all events from the database.
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message }); // Return error if any.
    }
});

// Endpoint to create a new event
router.post('/', async (req, res) => {
    if (!req.body.title || !req.body.start || !req.body.end) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const newEvent = new Event({
        title: req.body.title,
        patient: req.body.patient,
        content: req.body.content,
        username: req.body.username,
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

// Endpoint to update an existing event
router.put('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Update event properties with request data
        event.title = req.body.title || event.title;
        event.patient = req.body.patient || event.patient;
        event.content = req.body.content || event.content;
        event.username = req.body.username || event.username;
        event.start = req.body.start || event.start;
        event.end = req.body.end || event.end;

        const updatedEvent = await event.save();
        res.json(updatedEvent);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Endpoint to delete an existing event
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }
        await Event.deleteOne({ _id: req.params.id }); // Directly delete the document without fetching it
        res.status(200).json({ message: "Event deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
