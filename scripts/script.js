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
    var searchCon = document.getElementById('search-container');
    var searchWrap = document.querySelector('.search-wrapper');
    var searchBtn = document.getElementById('search-button');
    var title = document.querySelector('h1');

    if (data.length > 0) {
        map.style.opacity="1";
        searchCon.style.flexDirection = "row";
        searchWrap.style.height = "auto";
        searchBtn.style.marginLeft = "20px";
        title.style.marginBottom="0";
        title.style.marginTop="30px";

        let htmlContent = '<ul>';
        if (data.length > 1){
            htmlContent += `<li><i>We found 2 data points for your zip code.</i></li><br>`
        } 
        data.forEach(row => {
            htmlContent += `<li>You live in <span class="data-text">${row.geography}</span></li>`; // Replace 'geogrpahy' with the actual property name
            htmlContent += `<li>The temperature you experience in the summers are <span class="data-text">${row.summertemp} F </span></li>`
            htmlContent += `<li>This must be because the vegetation cover in your neighborhood is only <span class="data-text">${row.vegcoverage}%</span></li>`
            htmlContent += `<li>With more vegetation, and less concrete, your temperature could be reduced to <span class="data-text">${row.summertemp-9.5} F</span></li>`
            htmlContent += `<li>Your walkability to a park is approximately <span class="data-text">${row.walkability}%</span></li>`
            htmlContent += `<li>Wouldn't it be amazing if you also had a green space right above you?</li><br>`
        })
        htmlContent += '</ul>';
        resultContainer.innerHTML = htmlContent;
    } else{
        resultContainer.innerHTML = `<i>No results found</i>`;
    }
}