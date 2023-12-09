const fs = require('fs');
const Papa = require('papaparse');

// Function to read a CSV file and parse it
function readCSV(filePath) {
    const csvFile = fs.readFileSync(filePath, 'utf8');
    return new Promise(resolve => {
        Papa.parse(csvFile, {
            header: true,
            complete: results => resolve(results.data)
        });
    });
}

// Function to find latitude and longitude by neighborhood name
function findLatLng(geography, sourceData) {
    const data = sourceData.find(row => row.geography === geography);
    return data ? { lat: data.lat, lng: data.lng } : null;
}

// Main function to transfer data
async function transferLatLng(sourceFilePath, targetFilePath, outputFilePath) {
    try {
        const sourceData = await readCSV(sourceFilePath);
        const targetData = await readCSV(targetFilePath);

        // Transfer lat and lng data
        const updatedData = targetData.map(row => {
            const latLng = findLatLng(row.geography, sourceData);
            return latLng ? { ...row, ...latLng } : row;
        });

        // Convert updated data back to CSV
        const updatedCSV = Papa.unparse(updatedData);
        fs.writeFileSync(outputFilePath, updatedCSV);
        console.log('Data transferred successfully.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Run the function with file paths
transferLatLng('GeoLookup-full.csv', 'merged_geocoded_dataset-2.csv', 'final-merged.csv');