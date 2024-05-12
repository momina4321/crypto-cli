const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/delete', (req, res) => {
    const file = req.body.filename; // Get the filename from the request body
    const filePath = path.join(__dirname, '../../backend/draw-chart/', file); // Construct the file path
     console.log(file)
    // Check if the file exists
    if (fs.existsSync(filePath)) {
        // Delete the file
        fs.unlinkSync(filePath);
        res.status(200).json({ message: 'File deleted successfully.' });
    } else {
        // If the file doesn't exist, return a 404 error
        res.status(404).json({ error: 'File not found.' });
    }
});

module.exports = router;
