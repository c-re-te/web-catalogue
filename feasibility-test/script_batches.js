const BATCH_SIZE = 100; // Define batch size
let artworksArray = [];

// Function to load CSV in batches and store as an array
function loadCSVinBatches() {
    return fetch('syndata_artworks.csv')
        .then(response => response.text())
        .then(data => {
            artworksArray = data.split('\n'); // Split entire CSV into rows
        })
        .catch(error => {
            console.error('Error loading the CSV file:', error);
        });
}

// Advanced search function with minibatch approach
async function advancedSearch() {
    let authorNameInput = document.getElementById("authorNameInput").value.toUpperCase();
    let subjectInput = document.getElementById("subjectInput").value.toUpperCase();
    let datingFromInput = document.getElementById("datingFromInput").value;
    let datingToInput = document.getElementById("datingToInput").value;
    let results = document.getElementById("results");
    results.innerHTML = "";
    let resultCount = 0;

    // Start timing the search process
    const startTime = performance.now();

    // Process the dataset in batches
    for (let i = 0; i < artworksArray.length; i += BATCH_SIZE) {
        let batch = artworksArray.slice(i, i + BATCH_SIZE);
        resultCount += await processBatch(batch, authorNameInput, subjectInput, datingFromInput, datingToInput);
    }

    // End timing the search process
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    // Display the total number of results found and the time taken
    results.innerHTML = `<p><strong>Number of results found:</strong> ${resultCount}</p>` + results.innerHTML;
    document.getElementById("timer").innerHTML = `<p><strong>Time taken:</strong> ${timeTaken.toFixed(2)} milliseconds</p>`;
}

// Function to process each batch and apply search filters
function processBatch(batch, authorNameInput, subjectInput, datingFromInput, datingToInput) {
    let resultCount = 0;
    let results = document.getElementById("results");

    // Return a promise to ensure async handling
    return new Promise((resolve) => {
        setTimeout(() => {
            batch.forEach(row => {
                const cols = row.split(',');

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

            // Resolve the promise with the number of results found in this batch
            resolve(resultCount);
        }, 0); // Use 0ms delay to prevent UI blocking
    });
}

// Load the CSV data on page load
window.onload = loadCSVinBatches;