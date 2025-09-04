// ************************************************************
// *** RETRIEVE INPUT PARAMETERS OF THE QUERY - MAIN SEARCH ***
// ************************************************************

// >>> Main mask in SEARCH.HTML
function sendNewQueryVal() {
    
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
    var queryParams = {
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
    var queryString = "?" + Object.entries(queryParams)
        .filter(([, value]) => value !== null)                        // Strip nulls
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // Code values
        .join("&");

    location.href = `query.html${queryString}`;
}

// **********************************************

// ANCILLARY FUNCTION 1. Parse string to
// retrieve query parameters as dictionary

function parseQueryURLString() {
    // Get and parse URL

    queryParams = {};

    // Parse the query string only in queries
    if (window.location.search) {

        // E.g. query.html?obj=rilievo&a_0=Antonio Begarelli
        // paramsArray[0] = "query.html?"
        // paramsArray[1][0] = "obj=rilievo"
        // paramsArray[1][1] = "a_0=Antonio Begarelli"

        paramsArray = window.location.search.split("?")[1].split("&");

        paramsArray.forEach(paramString => {
            var paramKey = paramString.split("=")[0];                      // obj
            var paramVal = decodeURIComponent(paramString.split("=")[1]);  // rilievo
            
            if (paramKey in queryParams) {
            //  E.g. query.html?alt_a=Antonio Begarelli&alt_a=Antonio Begarelli
            //  queryParams[paramKey] = ["Antonio Begarelli", "Antonio Begarelli"]
                queryParams[paramKey].push(paramVal);
            } else {
                queryParams[paramKey] = [paramVal];
            }
        })

    }

    return queryParams;
}

// ANCILLARY FUNCTION 2. Compose string from
// query parameters dictionary (reverse of 1)

function getURLStringfromParams(queryParams) {
    const queryArray = [];

    // Iterate over the keys and values in queryParams
    // queryParams is an object: use for... in not forEach
    for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key)) {
            const values = queryParams[key];

            // Ensure each value is encoded and added as `key=value`

            // For single values: e.g. query.html?alt_a=Alfonso Lombardi
            if (typeof values === "string") {
                queryArray.push(`${encodeURIComponent(key)}=${encodeURIComponent(values)}`);
            } else {
            // For multiple values: e.g. query.html?alt_a=Alfonso Lombardi&alt_a=Ludovico Castellani
                for (const value of values) {
                    queryArray.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
                }
            }
        }
    }

    // Join all key-value pairs with "&" and append to the baseURL
    return queryArray.join("&");
}


// *******************************************************************
// *** RETRIEVE INPUT PARAMETERS OF THE QUERY - FILTERS REFINEMENT ***
// *******************************************************************

function refineQuery(chosen_filter, filter_type) {

    function updateURLQuery(queryString) {

        const currentString = window.location.search;
    
        if (currentString.includes("?")) {
            var connector = "&";
        } else {
            var connector = "?";
        }

        return currentString + connector + queryString;

    }

    switch (filter_type) {

        case "accordion-row":
            var filter_label = chosen_filter[0];
            var filter_value = chosen_filter[1];

            mapped_label = {
                "Autore": "a_0",
                "Altre attribuzioni": "alt_a",
                "Ubicazione attuale": "l_0",
                "Ubicazioni precedenti": "alt_l",
                "Soggetto": "sub",
                "Oggetto": "obj",
                "Tecnica": "tec",
                "Lavorazione": "sfc",
            }

            newQueryToken = mapped_label[filter_label] + "=" + encodeURIComponent(filter_value);
            location.href = updateURLQuery(newQueryToken);
            break;

        case "leaflet-map":
            location.href = updateURLQuery("city=" + encodeURIComponent(chosen_filter));
            break

        case "date-form":

            // Differently from the other filters, with dates
            // we need to overwrite previous values and cannot 
            // be merely appended

            var queryParams = parseQueryURLString()  // Retrieve current parameter

            if (chosen_filter[0]) {
                queryParams['dfr'] = chosen_filter[0];
            };
            if (chosen_filter[1]) {
                queryParams['dto'] = chosen_filter[1]
            };

            // Use the ancillary function to compose the query string
            var newQueryURLString = 'query.html?' + getURLStringfromParams(queryParams);
            location.href = newQueryURLString;      // Check button: type = "reset"

            break;
    
        }

}

// **************************************************
// *** MINIBATCH SEARCH ALGORITHM - in query.html ***
// **************************************************

function runQuery() {
    const queryParams = parseQueryURLString()
    const BATCH_SIZE = 25; // Define batch size
    let dataFiltered = [];

    // Remove province from locations strings in filters*
    if (queryParams.l_0) {
        queryParams.l_0 = [queryParams.l_0[0].replace(/ \([^)]+\)/g, '')];
    }

    if (queryParams.alt_l) {
        queryParams.alt_l = queryParams.alt_l.map(s => s.replace(/ \([^)]+\)/g, ''));
    }

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
            firstMatch = true;

            let isMatch = true; // Flag to track if the item matches all filters

            // Ancillay function 1: Matches values for repeated fields (author / locations)
            function matchesValues(valueArray, queryArray, isPartialCheck = true) {
                if (!Array.isArray(queryArray)) queryArray = [queryArray];                                      // Cast to array

                const matchFunc = isPartialCheck
                // PARTIAL MATCH: Is there at least some value for which it holds that
                // at least one of the values of the batch row includes 
                // the query value? Returns a boolean
                    ? (queryValue, value) => value && value.toLowerCase().includes(queryValue.toLowerCase())

                // EXACT MATCH: Is there at least some value for which it holds that
                // at least one of the values of the batch row matches 
                // the query value? Returns a boolean
                    : (queryValue, value) => value && value.toLowerCase() === queryValue.toLowerCase();
                
                if (queryArray.length > 1) {

                }
                return queryArray.some(queryValue =>
                    valueArray.some(value => matchFunc(queryValue, value))
                );

                // Notice that later you check if it DOES NOT match
                // with !matchesValues(...)
            }

            // Ancillary function 1B: Exact match for multiple query in the same fiedl (for authors and collocations)
            function allValuesMatchExact(valueArray, queryArray) {
                if (!Array.isArray(queryArray)) queryArray = [queryArray];

                return queryArray.every(queryValue =>
                    valueArray.some(value => 
                        value && value.toLowerCase() === queryValue.toLowerCase()
                    )
                );
            }

            // Ancillary function 2: Filter string creator for locations
            // iterating over increasing indexes
            function filterLocStringCreator(item, index) {
                const cont = item[`l${index}-cont`] || "";
                const city = item[`l${index}-city`] || "";
                if (city && cont) return `${city}, ${cont}`;
                return city || cont;
            }

            // =========================
            // === CHECK FOR MATCHES ===
            // =========================

            // 0. Free search (partial match)
            if (queryParams.txt && !Object.values(item).some(value => {
                return value && value.toString().toLowerCase().includes(queryParams.txt[0].toLowerCase());
            })) {
                isMatch = false;
            }
            
            // 1A. Authors and other attributions (partial match)
            if (queryParams.aut && !matchesValues([
                item["author"], item["author-amb"], item["author-1"], item["author-1-amb"],
                item["author-2"], item["author-2-amb"], item["author-3"], item["author-3-amb"],
                item["author-4"], item["author-4-amb"]
            ], queryParams.aut, true)) {
                isMatch = false;
            }

            // 1B. Known author (partial match)
            if (queryParams.a_0 && !matchesValues([item["author"]], queryParams.a_0, true)) {
                isMatch = false;
            }

            // 1C. Other attributions (multiple match) *
            if (queryParams.alt_a) {

                let itemAuthors = [
                    item["author-1"],
                    item["author-2"],
                    item["author-3"],
                    item["author-4"]
                ];

                if (queryParams.alt_a.length === 1) {
                    if (!itemAuthors.some(val => queryParams.alt_a.includes(val))) {
                        isMatch = false;
                    }
                } else if (queryParams.alt_a.length > 1) {
                    if(!allValuesMatchExact(itemAuthors, queryParams.alt_a)) {
                        isMatch = false;
                    }
                }
            }

            // 2. Object (exact match)
            if (queryParams.obj && item["obj-def"].toLowerCase() !== queryParams.obj[0].toLowerCase()) {
                isMatch = false;
            }

            // 3. Subject / Denominantion (partial match)
            if (queryParams.sub && !matchesValues([
                item["subj"], item["deno"]
            ], queryParams.sub, true)) {
                isMatch = false;
            }

            // 3 bis. Subject / Denominantion (exact match) for filters
            // ...

            // 4. Technique (exact match)
            if (queryParams.tec && item["tech"].toLowerCase() !== queryParams.tec[0].toLowerCase()) {
                isMatch = false;
            }

            // 5. Surface (partial match)
            if (queryParams.sfc && !item["lav"].toLowerCase().includes(queryParams.sfc[0].toLowerCase())) {
                isMatch = false;
            }

            // 6A. Chronology (from)
            if (queryParams.dfr && (isNaN(item["date-from"]) || parseInt(item["date-from"]) < parseInt(queryParams.dfr[0]))) {
                isMatch = false;
            }

            // 6B. Chronology (to)
            if (queryParams.dto && (isNaN(item["date-to"]) || parseInt(item["date-to"]) > parseInt(queryParams.dto[0]))) {
                isMatch = false;
            }

            // 7A. Location - any (partial match)
            if (queryParams.loc && !matchesValues([
                item["l0-cont"], item["l0-city"], item["l0-prov"],
                item["l1-cont"], item["l1-city"], item["l1-prov"],
                item["l2-cont"], item["l2-city"], item["l2-prov"],
                item["l3-cont"], item["l3-city"], item["l3-prov"],
                item["l4-cont"], item["l4-city"], item["l4-prov"]
            ], queryParams.loc, true)) {
                isMatch = false;
            }
            
            // 7B-α. Current location - full description (exact match) *
            if (queryParams.l_0 && filterLocStringCreator(item, 0).toLowerCase() !== queryParams.l_0[0].toLowerCase()) {
                isMatch = false;
            }
            
            // 7B-β. Current location - only city (exact match) **
            if (queryParams.city && item["l0-city"].toLowerCase()  !==  queryParams.city[0].toLowerCase()) {
                isMatch = false;
            }
            
            // 7C. Previous locations - full description (multiple match) *
            if (queryParams.alt_l) {

                let itemLocations = [
                    filterLocStringCreator(item, 1),
                    filterLocStringCreator(item, 2),
                    filterLocStringCreator(item, 3),
                    filterLocStringCreator(item, 4)
                ];

                if (queryParams.alt_l.length === 1) {
                    if (!itemLocations.some(val => queryParams.alt_l.includes(val))) {
                        isMatch = false;
                    }
                } else if (queryParams.alt_l.length > 1) {
                    if(!allValuesMatchExact(itemLocations, queryParams.alt_l)) {
                        isMatch = false;
                    }
                }
            }
            
            // 8. Connected artworks (exact match) ***
            if (queryParams.rel && item["rel"].toLowerCase()  !==  queryParams.rel[0].toLowerCase()) {
                isMatch = false;
            }

            //   * Use only in filters
            //  ** Use only in filters - Map
            // *** Use only in entries
            // ======================

            // If the item matches all filters, add it to the filtered results
            if (isMatch) {
                dataFiltered.push(item['url']);
            }
        });
    }

    return advancedSearch(queryParams);
}

// ***********************************************************************
// *** REMOVE PARAMETERS OF THE QUERY - REFINEMENT via MAINCOL BUTTONS ***
// ***********************************************************************

function removeQueryParams(paramKey) {
    const queryParams = parseQueryURLString();

    // Remove the parameter from the dictionary
    delete queryParams[paramKey];

    // Use the ancillary function to compose the query string
    const newQueryURLString = 'query.html?' + getURLStringfromParams(queryParams);

    location.href = newQueryURLString;
}