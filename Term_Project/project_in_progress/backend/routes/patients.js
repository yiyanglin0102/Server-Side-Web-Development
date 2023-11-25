// routes/patients.js

const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Image = require('../models/Image');


// Endpoint to search patients by name
router.get('/search', async (req, res) => {
    try {
        const nameQuery = req.query.name || '';
        console.log(nameQuery);
        const regex = new RegExp(nameQuery, 'i'); // 'i' for case-insensitive
        const patients = await Patient.find({
            $or: [
                { firstname: { $regex: regex } },
                { lastname: { $regex: regex } }
            ]
        });
        console.log(patients);

        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



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
        // console.log(savedPatient);
        const savedPatient = await newPatient.save(); // Save the new event to the database.
        res.status(201).json(savedPatient); // Return the saved event data.
    } catch (err) {
        res.status(400).json({ message: err.message }); // Return error if any.
    }
});

router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        // console.log(patient);
        res.json(patient);
    } catch (err) {
        console.error("Error fetching patient:", err);
        res.status(500).json({ message: err.message });
    }
});

// Endpoint to update an existing patient
router.put('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Update patient properties with request data
        patient.firstname = req.body.firstname || patient.firstname;
        patient.lastname = req.body.lastname || patient.lastname;
        patient.birthdate = req.body.birthdate || patient.birthdate;
        patient.sex = req.body.sex || patient.sex;
        patient.ethnicity = req.body.ethnicity || patient.ethnicity;
        patient.image_id = req.body.image_id || patient.image_id;

        const updatedPatient = await patient.save();
        res.json(updatedPatient);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const mail = await Patient.findById(req.params.id);
        if (!mail) {
            return res.status(404).json({ message: "Patient not found." });
        }
        await Patient.deleteOne({ _id: req.params.id }); // Directly delete the document without fetching it
        res.status(200).json({ message: "Patient deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
