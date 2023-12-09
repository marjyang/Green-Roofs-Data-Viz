document.getElementById('search-button').addEventListener('click', function() {
    var zip = document.getElementById('zip-code-input').value;
    loadData().then(data => {
        const result = data.filter(row => row.zip === zip);
        displayResults(result);
    }).catch(error => console.error('Error:', error));
});

function loadData() {
    return fetch('final-merged.json') // Replace 'data.json' with the path to your JSON file
        .then(response => response.json());
}

// function displayResults(data) {
//     // Process and display the data
//     var resultContainer = document.getElementById('result-container');
//     resultContainer.innerHTML = data.length > 0 ? JSON.stringify(data) : 'No results found';
// }

function displayResults(data) {
    var resultContainer = document.getElementById('result-container');
    
    if (data.length > 0) {
        let htmlContent = '<ul>';
        data.forEach(row => {
            htmlContent += `<li>${row.geography}</li>`; // Replace 'geogrpahy' with the actual property name
        });
        htmlContent += '</ul>';
        resultContainer.innerHTML = htmlContent;
    } else {
        resultContainer.innerHTML = 'No results found';
    }
}