var map = L.map('map').setView([40.785091, -73.968285], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 80,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', function() {
    var inputZip = document.getElementById('zip-code-input').value;
    searchByZipCode(inputZip);
});

// Event listener for pressing 'Enter' on the zip code input
document.getElementById('zip-code-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submit behavior
        // Simulate a click on the search button
        document.getElementById('search-button').click();
    }
});

// Function to add markers to the map
function addMarkers(data) {
    data.forEach(point => {
        var marker = L.marker([parseFloat(point.lat), parseFloat(point.lng)]);
        // Configure and add marker to the map
        // Create popup content string
        var popupContent = `
              <div>
                  <h4>ZIP Code: ${point.zip}</h4>
                  <p>Veg Coverage: ${point.vegcoverage}%</p>
                  <p>Summer Temperature: ${point.summertemp}°F</p>
                  <p>Walkability: ${point.walkability}/100</p>
              </div>
          `;

        // Bind popup to marker
        marker.bindPopup(popupContent);

        marker.addTo(map);
    });
}

// Global variable to store JSON data
var jsonData = [];

// Load JSON data
fetch('final-merged.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data; // Store data globally
    })
    .catch(error => console.error('Error loading JSON data:', error));


// Function to search and display markers by zip code
function searchByZipCode(zipCode) {
    // Filter data for the entered zip code
    var filteredData = jsonData.filter(point => point.zip === zipCode);

    if (filteredData.length > 0) {
        // Clear existing markers
        map.eachLayer(function(layer) {
            if (!!layer.toGeoJSON) {
                map.removeLayer(layer);
            }
        });

        // Add new markers
        addMarkers(filteredData);

        // Optionally, set the map view to the first matched location
        map.setView([parseFloat(filteredData[0].lat), parseFloat(filteredData[0].lng)], 13);
    } else {
        console.log('No data found for the entered zip code');
    }
}