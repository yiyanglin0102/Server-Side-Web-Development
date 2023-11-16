// routes/patients.js

const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); // Importing the Patient model to interact with the database.

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
    const { firstname, lastname, birthdate, sex, ethnicity, image, host } = req.body;

    const newPatient = new Patient({
        firstname,
        lastname,
        birthdate,
        sex,
        ethnicity,
        image,
        host,
    });

    try {
        const savedPatient = await newPatient.save(); // Save the new event to the database.
        res.status(201).json(savedPatient); // Return the saved event data.
    } catch (err) {
        res.status(400).json({ message: err.message }); // Return error if any.
    }
});

module.exports = router;
