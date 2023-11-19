var map = L.map('map').setView([40.785091, -73.968285], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitBtn').addEventListener('click', function() {
        var zipCode = document.getElementById('zipCodeInput').value;
        if (zipCode) {
            loadMultipleDataSets(zipCode);
        }
    });
});

function loadMultipleDataSets(zipCode) {
    Promise.all([
        loadDataPromise('path/to/data1.json'),
        loadDataPromise('path/to/data2.json'),
        // Add as many datasets as needed
    ])
    .then(function(results) {
        // Combine or process data from multiple datasets
        var combinedData = combineData(results, zipCode);
        displayData(combinedData);
    })
    .catch(function(error) {
        console.error('Error loading data:', error);
    });
}

function loadDataPromise(url) {
    return new Promise(function(resolve, reject) {
        Papa.parse(url, {
            download: true,
            header: true,
            complete: function(results) {
                resolve(results.data);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

function combineData(dataArrays, zipCode) {
    // Example of combining data from different datasets
    var combinedData = [];
    dataArrays.forEach(function(data) {
        var filteredData = data.filter(function(item) {
            return item.zipCode === zipCode;
        });
        combinedData = combinedData.concat(filteredData);
    });
    return combinedData;
}

function displayData(combinedData) {
    var output = document.getElementById('output');
    output.innerHTML = '';
    if (combinedData.length > 0) {
        combinedData.forEach(function(item) {
            var div = document.createElement('div');
            div.innerHTML = 'Climate: ' + item.climate + '<br>' +
                            'Current Vegetative Cover: ' + item.vegetativeCover + '<br>' +
                            'Park Proximity: ' + item.distanceToPark;
            output.appendChild(div);
        });
    } else {
        output.innerHTML = 'No data found for this ZIP code.';
    }
}
