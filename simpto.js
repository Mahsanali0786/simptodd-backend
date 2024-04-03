const express = require('express');
const XLSX = require('xlsx');
const path = require('path');
const https = require("https");
const app = express();
const port = 3000;

// Function to read the XLSX file and return the data
function readExcelFile() {
    const filePath = path.join(__dirname, 'excel', 'simpto.xlsx');
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    return data;
}

// API endpoint to get the data from the XLSX file
app.get('/api/excel-data', (req, res) => {
    const data = readExcelFile();
    res.json(data);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
