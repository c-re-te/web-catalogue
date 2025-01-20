// **********************
// *** in SEARCH.HTML ***
// **********************

// From the input values to the URL
function sendQueryVal() {
    
    // 1. GET VALUE INDICATED BY USER
    function getValue(inputElement) {
        if (!inputElement) return null;                               // Null values
    
        if (inputElement.tagName === 'SELECT') {                      // A. Select fields
            if (inputElement.value.startsWith('Scegli')) {            //    Escape default values
                return null
            } else {return inputElement.value || null}                
        }
    
        return inputElement.value || null;                            // B. Input fields
    }
    
    const getRadioValue = (name) => {                                 // C. Radio buttons
        const radios = document.getElementsByName(name);
        for (const radio of radios) {
            if (radio.checked) return radio.value;
        }
        return null; // if none selected
    };

    // Get form elements
    const formEls = document.getElementsByClassName("crete-query-form");

    // Map the values to the query parameters
    const queryParams = {
        txt: getValue(formEls[0]),                // Free text search
        aut: getValue(formEls[1]),                // Author
        dfr: getValue(formEls[2]),                // Date From
        dto: getValue(formEls[3]),                // Date To
        loc: getValue(formEls[4]),                // Location
        sub: getValue(formEls[5]),                // Subject
        obj: getValue(formEls[6]),                // Object
        tec: getRadioValue('tech-radio-options'), // Technique
        sfc: getValue(formEls[7]),                // Surface
    };

    // 2. COMPOSE TARGET URL QUERY STRING
    const queryString = Object.entries(queryParams)
        .filter(([, value]) => value !== null)                        // Strip nulls
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // Code values
        .join("&");

    // Debug
    // console.log("Query parameters:", queryParams);
    // console.log("Query string:", queryString);

    location.href = `query.html?${queryString}`;
}

// *********************
// *** in QUERY.HTML ***
// *********************

// From the URL to query parameters
function parseQueryString() {
    // Get and parse URL with URLSearchParams API
    const queryString = window.location.search; 
    const urlParams = new URLSearchParams(queryString);

    // Map query string parameters to variables
    const queryParams = {
        txt: urlParams.get('txt'),   // Free text search
        aut: urlParams.get('aut'),   // Author
        dfr: urlParams.get('dfr'),   // Date From
        dto: urlParams.get('dto'),   // Date To
        loc: urlParams.get('loc'),   // Location
        sub: urlParams.get('sub'),   // Subject
        obj: urlParams.get('obj'),   // Object
        tec: urlParams.get('tec'),   // Technique
        sfc: urlParams.get('sfc'),   // Surface

        // Specific for filter
        a_0:urlParams.get('a_0'),       // Current author
        l_0: urlParams.get('l_0'),      // Current location
        alt_a: urlParams.get('alt_a'),  // Alternative author
        alt_l: urlParams.get('alt_l'),  // Alternative locations
        city: urlParams.get('city'),    // Current city

        // Specific for entry
        rel: urlParams.get('rel')    // Relation !!
    };

    return queryParams;

    // Called in function runQuery() of query-display.js
}

function refineQueryLink(event, filter_value, filter_label) {
    if (event) {
    event.preventDefault(); // Block navigation with <a>
    }

    if (filter_label === "Autore") {
        var newQueryToken = `a_0=${encodeURIComponent(filter_value)}`;
    } else if (filter_label === "Altre attribuzioni") {
        var newQueryToken = `alt_a=${encodeURIComponent(filter_value)}`;
    } else if (filter_label === "Ubicazione attuale") {
        var newQueryToken = `l_0=${encodeURIComponent(filter_value)}`;
    } else if (filter_label === "Ubicazioni precedenti") {
        var newQueryToken = `alt_l=${encodeURIComponent(filter_value)}`;
    } else if (filter_label === "Soggetto") {
        var newQueryToken = `sub=${encodeURIComponent(filter_value)}`;
    } else if (filter_label === "Oggetto") {
        var newQueryToken = `obj=${encodeURIComponent(filter_value)}`;
    } else if (filter_label === "Tecnica") {
        var newQueryToken = `tec=${encodeURIComponent(filter_value)}`;
    } else if (filter_label === "Lavorazione") {
        var newQueryToken = `sfc=${encodeURIComponent(filter_value)}`;
    }

    const queryString = window.location.search;
    
    if (queryString.includes("?")) {
        var connector = "&";
    } else {
        var connector = "?";
    }

    location.href = queryString + connector + newQueryToken;

}

function refineQueryMap(city) {
    newQueryToken = `city=${encodeURIComponent(city)}`;
    const queryString = window.location.search;
    
    if (queryString.includes("?")) {
        var connector = "&";
    } else {
        var connector = "?";
    }

    location.href = queryString + connector + newQueryToken;

}

// NOT WORKING TO REVISE *ALL* FILTERS BY DATE
function refineQueryChrono(newQueryTokenFrom, newQueryTokenTo) {
    let newQueryToken = "";

    if (newQueryTokenFrom && newQueryTokenTo) {
        newQueryToken = `dfr=${encodeURIComponent(newQueryTokenFrom)}&dto=${encodeURIComponent(newQueryTokenTo)}`;
    } else if (!newQueryTokenFrom && newQueryTokenTo) {
        newQueryToken = `dto=${encodeURIComponent(newQueryTokenTo)}`;
    } else if (newQueryTokenFrom && !newQueryTokenTo) {
        newQueryToken = `dfr=${encodeURIComponent(newQueryTokenFrom)}`;
    }

    const queryString = window.location.search;
    
    let connector = queryString.includes("?") ? "&" : "?";

    location.href = queryString + connector + newQueryToken;
}

// *** MINIBATCH QUERYING FUNCTIONS ***

function runQuery() {
    const queryParams = parseQueryString();

    const BATCH_SIZE = 100; // Define batch size
    let dataFiltered = [];

    // Function to perform the search based on queryParams filters
    function advancedSearch(queryParams) {

        // Process the dataset in batches
        for (let i = 0; i < data.length; i += BATCH_SIZE) {
            let batch = data.slice(i, i + BATCH_SIZE);
            processBatch(batch, queryParams);
        }

        return dataFiltered;
    }

    // Compare the results in data with the ones provided in the queryParams
    function processBatch(batch, queryParams) {
        batch.forEach(item => {
            
            let isMatch = true; // Flag to track if the item matches all filters

            // Check match for authors
            if (queryParams.aut && !(
                item["author"].toLowerCase().includes(queryParams.aut.toLowerCase())   || 
                item["author-amb"].toLowerCase().includes(queryParams.aut.toLowerCase())   ||
                item["author-1"].toLowerCase().includes(queryParams.aut.toLowerCase()) || 
                item["author-1-amb"].toLowerCase().includes(queryParams.aut.toLowerCase()) ||
                item["author-2"].toLowerCase().includes(queryParams.aut.toLowerCase()) || 
                item["author-2-amb"].toLowerCase().includes(queryParams.aut.toLowerCase()) ||
                item["author-3"].toLowerCase().includes(queryParams.aut.toLowerCase()) || 
                item["author-3-amb"].toLowerCase().includes(queryParams.aut.toLowerCase()) ||
                item["author-4"].toLowerCase().includes(queryParams.aut.toLowerCase()) || 
                item["author-4-amb"].toLowerCase().includes(queryParams.aut.toLowerCase())
            )) {
                isMatch = false;
            }

            // Check exact match for object
            if (queryParams.obj && item["obj-def"].toLowerCase() !== queryParams.obj.toLowerCase()) {
                isMatch = false;
            }
            
            // Check match for subject
            if (queryParams.sub && !(
                item["subj"].toLowerCase().includes(queryParams.sub.toLowerCase()) || 
                item["deno"].toLowerCase().includes(queryParams.sub.toLowerCase())
            )) {
                isMatch = false;
            }

            // Check exact match for technique
            if (queryParams.tec && item["tech"].toLowerCase() !== queryParams.tec.toLowerCase()) {
                isMatch = false;
            }

            // Check exact match for surface
            if (queryParams.sfc && item["lav"].toLowerCase() !== queryParams.sfc.toLowerCase()) {
                isMatch = false;
            }

            // Check match for chronology
            if (queryParams.dfr && (isNaN(parseInt(item['date-from'])) || parseInt(item['date-from']) < parseInt(queryParams.dfr))) {
                isMatch = false; 
            }
            
            if (queryParams.dto && (isNaN(parseInt(item['date-to'])) || (parseInt(item['date-to']) - parseInt(queryParams.dto) < 0))) {
                
                isMatch = false;
            }

            // Check match for location
            if (queryParams.loc && !(
                item["l0-cont"].toLowerCase().includes(queryParams.loc.toLowerCase()) || 
                item["l0-city"].toLowerCase().includes(queryParams.loc.toLowerCase()) ||
                item["l0-prov"].toLowerCase().includes(queryParams.loc.toLowerCase()) ||
                item["l1-cont"].toLowerCase().includes(queryParams.loc.toLowerCase()) || 
                item["l1-city"].toLowerCase().includes(queryParams.loc.toLowerCase()) ||
                item["l1-prov"].toLowerCase().includes(queryParams.loc.toLowerCase()) ||
                item["l2-cont"].toLowerCase().includes(queryParams.loc.toLowerCase()) || 
                item["l2-city"].toLowerCase().includes(queryParams.loc.toLowerCase()) ||
                item["l2-prov"].toLowerCase().includes(queryParams.loc.toLowerCase()) ||
                item["l3-cont"].toLowerCase().includes(queryParams.loc.toLowerCase()) || 
                item["l3-city"].toLowerCase().includes(queryParams.loc.toLowerCase()) ||
                item["l3-prov"].toLowerCase().includes(queryParams.loc.toLowerCase()) ||
                item["l4-cont"].toLowerCase().includes(queryParams.loc.toLowerCase()) || 
                item["l4-city"].toLowerCase().includes(queryParams.loc.toLowerCase()) ||
                item["l4-prov"].toLowerCase().includes(queryParams.loc.toLowerCase())
            )) {
                isMatch = false;
            }

            // Check with free text search
            if (queryParams.txt && !Object.entries(item).some(([key, value]) => {
                return value && value.toString().toLowerCase().includes(queryParams.txt.toLowerCase());
            })) {
                isMatch = false;
            }

            // Specific for FILTERS

            // Check exact match for sure author
            if (queryParams.a_0 && item["author"].toLowerCase() !== queryParams.a_0.toLowerCase()) {
                isMatch = false;
            }

            // Check exact match for other authors
            if (queryParams.alt_a && !(
                item["author-1"].toLowerCase().includes(queryParams.alt_a.toLowerCase()) || 
                item["author-2"].toLowerCase().includes(queryParams.alt_a.toLowerCase()) || 
                item["author-3"].toLowerCase().includes(queryParams.alt_a.toLowerCase()) || 
                item["author-4"].toLowerCase().includes(queryParams.alt_a.toLowerCase())  
            )) {
                isMatch = false;
            }

            // Check exact match for current loc with container
                // Recreate the label
                function filterStringCreator(item, int) {
                    if (item[`l${int}-cont`] && item[`l${int}-city`]) { 
                        var locString = item[`l${int}-city`] + " (" + item[`l${int}-cont`] + ")"; 
                    } else if (item[`l${int}-city`] && !item[`l${int}-cont`]) {var locString = item[`l${int}-city`];}
                    else if (!item[`l${int}-city`] && item[`l${int}-cont`]) {var locString = item[`l${int}-cont`];}
                    return locString || ""; 
                }

            if (queryParams.l_0 && filterStringCreator(item, 0).toLowerCase() !== queryParams.l_0.toLowerCase()) {
                isMatch = false;
            }

            // Check exact match for previous loc with container
            if (queryParams.alt_l && !(
                filterStringCreator(item, 1).toLowerCase().includes(queryParams.alt_l.toLowerCase()) || 
                filterStringCreator(item, 2).toLowerCase().includes(queryParams.alt_l.toLowerCase()) || 
                filterStringCreator(item, 3).toLowerCase().includes(queryParams.alt_l.toLowerCase()) || 
                filterStringCreator(item, 4).toLowerCase().includes(queryParams.alt_l.toLowerCase())  
            )) {
                isMatch = false;
            }

            // Check exact match for city
            if (queryParams.city && !(item["l0-city"].toLowerCase().includes(queryParams.city.toLowerCase()))) {
                isMatch = false;
            }

            // If the item matches all filters, add it to the filtered results
            if (isMatch) {
                dataFiltered.push(item['url']);
            }
        });
    }

    return advancedSearch(queryParams);
}
