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
    const { from, to, title, content } = req.body;

    const newMail = new Mail({
        from,
        to,
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

router.delete('/:id', async (req, res) => {
    try {
        const mail = await Mail.findById(req.params.id);
        if (!mail) {
            return res.status(404).json({ message: "Mail not found." });
        }
        await mail.remove(); // This deletes the document from the database
        res.status(200).json({ message: "Mail deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
