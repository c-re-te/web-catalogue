let artworksArray = [];

// Function to load CSV and store it as an array
function loadCSVtoArray() {
    return fetch('syndata_artworks.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            artworksArray = rows.map(row => row.split(',')); // Store the CSV as a 2D array
        })
        .catch(error => {
            console.error('Error loading the CSV file:', error);
        });
}

// Advanced search function
function advancedSearch() {
    var authorNameInput, subjectInput, datingFromInput, datingToInput, results, resultCount = 0;

    authorNameInput = document.getElementById("authorNameInput").value.toUpperCase();
    subjectInput = document.getElementById("subjectInput").value.toUpperCase();
    datingFromInput = document.getElementById("datingFromInput").value;
    datingToInput = document.getElementById("datingToInput").value;
    results = document.getElementById("results");
    results.innerHTML = "";

    const startTime = performance.now();

    // Ensure the CSV data is loaded before searching
    if (artworksArray.length === 0) {
        loadCSVtoArray().then(() => {
            performSearch(startTime);
        });
    } else {
        performSearch(startTime);
    }

    // Perform the search on the loaded CSV array
    function performSearch(startTime) {
        artworksArray.forEach(cols => {
            const authorName = cols[1]; // AUTHOR NAME 
            const subject = cols[13]; // SUBJECT
            const datingFrom = parseInt(cols[33]); // DATING FROM
            const datingTo = parseInt(cols[34]); // DATING TO

            // Artwork filtering
            if (
                (authorNameInput === '' || authorName.toUpperCase().includes(authorNameInput)) &&
                (subjectInput === '' || subject.toUpperCase().includes(subjectInput)) &&
                (isNaN(datingFromInput) || isNaN(datingFrom) || datingFrom >= datingFromInput) &&
                (isNaN(datingToInput) || isNaN(datingTo) || datingTo <= datingToInput)
            ) {
                results.innerHTML += `<p>
                            <strong>Author Name:</strong> ${authorName}, 
                            <strong>Subject:</strong> ${subject}, 
                            <strong>Dating From:</strong> ${datingFrom || 'N/A'}, 
                            <strong>Dating To:</strong> ${datingTo || 'N/A'}
                        </p>`;
                resultCount++;
            }
        });

        const endTime = performance.now();
        const timeTaken = endTime - startTime;
        
        document.getElementById("timer").innerHTML = `<p><strong>Time taken:</strong> ${timeTaken.toFixed(2)} milliseconds</p>`;

        // Display the number of results found
        results.innerHTML = `<p><strong>Number of results found:</strong> ${resultCount}</p>` + results.innerHTML;
    }
}

// Load the CSV data on page load
window.onload = loadCSVtoArray;