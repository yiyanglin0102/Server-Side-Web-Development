// routes/images.js

const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();
const Image = require('../models/Image'); // Importing the Event model to interact with the database.

// Configure multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST endpoint for file upload
router.post('/', upload.single('myfile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Create a new image document
    const newImage = new Image({
        name: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype
    });

    // Save the image in MongoDB
    const savedImage = await newImage.save();

    // Respond with the URL to access the image
    const savedId = savedImage._id;
    res.json({ savedId: savedId });
});

// hover images
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


router.delete('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Patient not found." });
        }
        await Image.deleteOne({ _id: req.params.id }); // Directly delete the document without fetching it
        res.status(200).json({ message: "Image deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
