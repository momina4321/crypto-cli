const path = require('path');
const fs = require('fs');
const express = require('express');
const Papa = require('papaparse');

const router = express.Router();




const readFile = (filepath) => {
    return new Promise((resolve, reject) => {
        const results = [];
                    //results array should look like results = [{date:'',price:'',low:'',high:''}, {...}]
       
                    let columns = [];

                    fs.createReadStream(filepath)
                        .pipe(Papa.parse(Papa.NODE_STREAM_INPUT, { header: true, delimiter: ',' })) // Parse CSV with headers
                        .on('data', (data) => {
                            if (columns.length === 0) {
                                // Extract column headers from the first row of data
                                columns = Object.keys(data);
                            }
                            // Create an object with meaningful keys using column headers
                            const rowData = {};
                            columns.forEach((column) => {
                                rowData[column] = data[column];
                            });
                            results.push(rowData);
                        })
            .on('end', () => {
                resolve(results); // Resolve the promise with the results
            })
            .on('error', (err) => {
                console.error('Error reading CSV file:', err);
                reject(err); // Reject the promise with the error
            });
    });
}

router.post('/draw', async (req, res) => {

    const {file} = req.body

    const filepath = path.join(__dirname, '../../backend/draw-chart/', file);

    if (fs.existsSync(filepath)) {
        try {
            const results = await readFile(filepath);
            console.log(results)
            return res.json(results); // Send the results as JSON response
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' }); // Handle any errors
        }
    } else {
        res.status(404).json({ error: 'File not found' }); // File does not exist
    }

});

module.exports = router;
