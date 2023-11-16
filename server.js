const express = require('express');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Handle GET request for the root
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Handle POST request to receive data
app.post('/data', (req, res) => {
  console.log(req.body); // Log data to the console
  res.status(200).json({ message: 'Data received successfully', receivedData: req.body });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});