// routes/patients.js

const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Image = require('../models/Image');

// Endpoint to fetch all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find(); // Fetch all patients from the database.
        res.json(patients);
        // console.log(patients)
    } catch (err) {
        res.status(500).json({ message: err.message }); // Return error if any.
    }
});

// Endpoint to create a new patient
router.post('/', async (req, res) => {
    const { firstname, lastname, birthdate, sex, ethnicity, image, host, image_id } = req.body;

    const newPatient = new Patient({
        firstname,
        lastname,
        birthdate,
        sex,
        ethnicity,
        image,
        host,
        image_id,
    });

    try {
        const savedPatient = await newPatient.save(); // Save the new event to the database.
        res.status(201).json(savedPatient); // Return the saved event data.
    } catch (err) {
        res.status(400).json({ message: err.message }); // Return error if any.
    }
});
router.get('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        // console.log("Requested image ID:", req.params.id); // Debug log

        if (image) {
            const imgBase64 = Buffer.from(image.data).toString('base64');
            const imgSrc = `data:${image.contentType};base64,${imgBase64}`;
            res.send(imgSrc); // Send the actual image data
        } else {
            res.status(404).send('No images found');
        }
    } catch (err) {
        console.error("Error fetching image:", err); // Debug log
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
