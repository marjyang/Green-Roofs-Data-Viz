const fs = require('fs');
const Papa = require('papaparse');

const csvFilePath = 'final-merged.csv'; // replace with your CSV file path

fs.readFile(csvFilePath, 'utf8', function (err, data) {
    if (err) {
        console.error('Error reading the CSV file:', err);
        return;
    }
    Papa.parse(data, {
        header: true,
        complete: function (results) {
            fs.writeFile('final-merged.json', JSON.stringify(results.data, null, 2), 'utf8', function (err) {
                if (err) {
                    console.error('Error writing JSON file:', err);
                } else {
                    console.log('JSON file has been saved.');
                }
            });
        }
    });
});