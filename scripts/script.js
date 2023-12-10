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
    var map = document.getElementById('map');
    var resultContainer = document.getElementById('result-container');

    if (data.length > 0) {
        map.style.display="block";

        let htmlContent = '<ul>';
        data.forEach(row => {
            htmlContent += `<li>You live in neighborhood: ${row.geography}</li>`; // Replace 'geogrpahy' with the actual property name
            htmlContent += `<li>The temperuature you experience in the summers are: ${row.summertemp} F</li>`
            htmlContent += `<li>This must be because the vegetation cover in your neighborhood is only ${row.vegcoverage}%!</li>`
            htmlContent += `<li>According to an NYT article, with more vegetation, and less concrete, your temperature could be ${row.summertemp-9.5} F</li>`
            htmlContent += `<li>Your walkability to a park is approximately: ${row.walkability} %.</li>`
            htmlContent += `<li>Wouldn't it be amazing if you also had a green space right above you?</li>`
        })
        htmlContent += '</ul>';
        resultContainer.innerHTML = htmlContent;
    } else {
        resultContainer.innerHTML = 'No results found';
    }
}