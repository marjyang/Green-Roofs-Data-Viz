const axios = require('axios');
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Function to perform geocoding
async function geocode(address) {
    try {
        const url = "https://nominatim.openstreetmap.org/search";
        const response = await axios.get(url, {
            params: {
                q: address,
                format: 'json',
                limit: 1
            }
        });

        if (response.data.length > 0) {
            return {
                lat: response.data[0].lat,
                lon: response.data[0].lon
            };
        }
    } catch (error) {
        console.error('Geocoding error:', error);
    }
    return { lat: null, lon: null };
}

// Function to read and parse a CSV file
function parseCsv(filePath) {
    return new Promise((resolve) => {
        let results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => results.push(row))
            .on('end', () => resolve(results));
    });
}

// Function to merge two datasets based on 'Geography'
function mergeDatasets(mainData, additionalData) {
    return mainData.map(item => {
        const additionalItem = additionalData.find(addItem => addItem.Geography === item.Geography) || {};
        return {...item, ...additionalItem };
    });
}

// Function to process and geocode datasets
async function processDatasets(firstCsvFilePath, secondCsvFilePath, thirdCsvFilePath, outputFilePath) {
    const data1 = await parseCsv(firstCsvFilePath);
    const data2 = await parseCsv(secondCsvFilePath);
    const data3 = await parseCsv(thirdCsvFilePath);

    let mergedData = mergeDatasets(data1, data2);
    mergedData = mergeDatasets(mergedData, data3);

    for (let row of mergedData) {
        const geocoded = await geocode(row.Geography + ', New York, NY');
        row.Latitude = geocoded.lat;
        row.Longitude = geocoded.lon;
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }

    const csvWriter = createCsvWriter({
        path: outputFilePath,
        header: [
            { id: 'Geography', title: 'Geography' },
            { id: 'Coverage Percentage', title: 'Coverage Percentage' },
            { id: 'Degrees Fahrenheit', title: 'Degrees Fahrenheit' },
            { id: 'Walkability Percent', title: 'Walkability Percent' },
            { id: 'Latitude', title: 'Latitude' },
            { id: 'Longitude', title: 'Longitude' }
        ]
    });

    csvWriter.writeRecords(mergedData)
        .then(() => console.log('The merged and geocoded CSV file was written successfully'));
}

// File paths
const firstCsvFilePath = 'csv-files/daytime-surface.csv'; // Replace with the path to your first CSV file
const secondCsvFilePath = 'csv-files/vegetative-cover.csv'; // Replace with the path to your second CSV file
const thirdCsvFilePath = 'csv-files/walking-distance.csv'; // Replace with the path to your third CSV file
const outputFilePath = 'merged_geocoded_dataset-2.csv';

// Process the datasets
processDatasets(firstCsvFilePath, secondCsvFilePath, thirdCsvFilePath, outputFilePath);