// uploads.js
const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const router = express.Router();

// Since mongoose connection is already established in server.js, use it directly
let gfs;
mongoose.connection.once('open', () => {
    // Init stream
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return {
            bucketName: 'uploads',
            filename: file.originalname,
        };
    },
});

const upload = multer({ storage });

// POST endpoint for file upload
router.post('/', upload.single('myfile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    console.log(req.file);
    res.send('File uploaded successfully.');
});

module.exports = router;
