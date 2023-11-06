// routes/mails.js

const express = require('express');
const router = express.Router();
const Mail = require('../models/Mail'); // Importing the Patient model to interact with the database.

// Endpoint to fetch all patients
router.get('/', async (req, res) => {
    try {
        const mails = await Mail.find(); // Fetch all patients from the database.
        res.json(mails);
        // console.log(mails)
    } catch (err) {
        res.status(500).json({ message: err.message }); // Return error if any.
    }
});

// Endpoint to create a new patient
router.post('/', async (req, res) => {
    const { title, content } = req.body;

    const newMail = new Mail({
        title,
        content
    });

    try {
        const savedMail = await newMail.save(); // Save the new event to the database.
        res.status(201).json(savedMail); // Return the saved event data.
    } catch (err) {
        res.status(400).json({ message: err.message }); // Return error if any.
    }
});

module.exports = router;
