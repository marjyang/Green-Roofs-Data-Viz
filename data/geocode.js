const axios = require('axios');
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('fast-csv').write;

// Function to perform geocoding
async function geocodeNeighborhood(neighborhood) {
    const url = "https://nominatim.openstreetmap.org/search";
    try {
        const response = await axios.get(url, {
            params: {
                q: neighborhood,
                format: 'json',
                addressdetails: 1
            }
        });
        if (response.data && response.data.length > 0) {
            // Extracting the postal code (zip code) from the response
            const postalCode = response.data[0].address.postcode || null;
            return postalCode;
        }
    } catch (error) {
        console.error(`Error during geocoding ${neighborhood}: `, error.message);
    }
    return null;
}

// Function to process the CSV file
async function processCsv(filePath) {
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => results.push(row))
        .on('end', async() => {
            console.log('CSV file successfully processed');
            for (const row of results) {
                const zipCode = await geocodeNeighborhood(row['Neighborhood Name']);
                row.ZipCode = zipCode;
                await new Promise(resolve => setTimeout(resolve, 1000)); // Delay to prevent rate limit issues
            }
            writeCsv(results);
        });
}

// Function to write the updated data to a new CSV file
function writeCsv(data) {
    createCsvWriter({
            path: 'updated_geolookup.csv',
            headers: Object.keys(data[0])
        })
        .write(data)
        .on('finish', () => console.log('Written to updated_geolookup.csv'));
}

// Replace 'path_to_your_csv_file.csv' with the path to your CSV file
processCsv('csv-files/GeoLookup.csv');