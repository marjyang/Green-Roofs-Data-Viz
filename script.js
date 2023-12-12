document.getElementById('search-button').addEventListener('click', function() {
    var zip = document.getElementById('zip-code-input').value;
    loadData().then(data => {
        const result = data.filter(row => row.zip === zip);
        displayResults(result);
    }).catch(error => console.error('Error:', error));
});

document.getElementById('search-button').addEventListener('click', function() {
    performSearch();
});

document.getElementById('reset-button').addEventListener('click', function() {
    window.scrollTo(0, 0);
});

// Event listener for pressing 'Enter' on the zip code input
document.getElementById('zip-code-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submit behavior
        var inputZip = document.getElementById('zip-code-input').value;
        searchByZipCode(inputZip);
    }
});


function loadData() {
    return fetch('final-merged.json') // Replace 'data.json' with the path to your JSON file
        .then(response => response.json());
}

function displayResults(data) {
    var body = document.querySelector('body');
    var map = document.getElementById('map');
    var resultContainer = document.getElementById('result-container');
    var searchCon = document.getElementById('search-container');
    var searchWrap = document.querySelector('.search-wrapper');
    var searchBtn = document.getElementById('search-button');
    var title = document.querySelector('h1');
    var resetBtn = document.getElementById('reset-button');

    map.style.opacity = "1";
        searchCon.style.flexDirection = "row";
        searchWrap.style.height = "auto";
        searchWrap.style.overflow = "auto";
        searchBtn.style.marginLeft = "20px";
        title.style.marginBottom = "0";
        title.style.marginTop = "30px";
        resetBtn.style.opacity = "1";
        body.style.height = "auto";
        body.style.overflowY = "visible";
        
    if (data.length > 0) {

        let htmlContent = '<ul>';
        if (data.length > 1) {
            resultContainer.style.fontSize = "16px";
            htmlContent += `<li><i>We found 2 data points for your zip code.</i></li><br>`
        }
        data.forEach(row => {
            htmlContent += `<li>You live in <span class="data-text">${row.geography}</span></li>`; // Replace 'geogrpahy' with the actual property name
            htmlContent += `<li>The temperature you experience in the summers is around <span class="data-text">${row.summertemp}°F </span></li>`
            htmlContent += `<li>This must be because the vegetation cover in your neighborhood is only <span class="data-text">${row.vegcoverage}%</span></li>`
            htmlContent += `<li>With more vegetation, and less concrete, your temperature could be reduced to <span class="data-text">${row.summertemp-9.5}°F</span></li>`
            htmlContent += `<li>Your walkability to a park is approximately <span class="data-text">${row.walkability}%</span></li>`
            htmlContent += `<li>Wouldn't it be amazing if you also had a green space right above you?</li><br>`
        })
        htmlContent += '</ul>';
        resultContainer.innerHTML = htmlContent;
    } else {
        resultContainer.innerHTML = `<i>No results found. We're currently working on adding more zip codes into our database. Thank you for your patience!</i>`;

    }
}