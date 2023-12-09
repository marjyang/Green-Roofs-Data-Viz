// const express = require('express');
// const app = express();

// // Middleware to parse JSON data
// app.use(express.json());

// // Handle GET request for the root
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // Handle POST request to receive data
// app.post('/data', (req, res) => {
//   console.log(req.body); // Log data to the console
//   res.status(200).json({ message: 'Data received successfully', receivedData: req.body });
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const fs = require('fs');
// const Papa = require('papaparse');
// const cors = require('cors');

// const app = express();
// app.use(cors()); // Enable CORS for client-side requests
// app.use(express.static('public')); // Serve static files from 'public' directory

// const PORT = 3000;

// // Function to read CSV and return data as JSON
// function readCSV(filePath) {
//     const csvFile = fs.readFileSync(filePath, 'utf8');
//     return new Promise(resolve => {
//         Papa.parse(csvFile, {
//             header: true,
//             complete: results => resolve(results.data)
//         });
//     });
// }

// // Endpoint to search by zip code
// app.get('/search', async (req, res) => {
//     const zip = req.query.zip;
//     const data = await readCSV('updated_target.csv');
//     const result = data.filter(row => row.zip === zip);
//     res.json(result);
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });