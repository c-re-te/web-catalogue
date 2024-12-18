let currentPage = 1;
let data = [];

// Load CSV data using PapaParse
function loadCSV() {
    Papa.parse('./assets/data/sample-query.csv', {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {

            data = results.data.map(row => ({ // Map the names of the columns
                'author': row['autore-0-name'] || '',
                'author-rif': row['autore-0-rif'] || '',

                'author-1': row['autore-1-name'] || '',
                'author-1-rif': row['autore-1-rif'] || '',

                'author-2': row['autore-2-name'] || '',
                'author-2-rif': row['autore-2-rif'] || '',

                'date-from': row['data-da'] || '',
                'date-to': row['data-a'] || '',
                
                'subj': row['soggetto'] || '',

                'obj-def': row['oggetto-def'] || '',

                'tech': row['tecnica'] || '',
                'lav': row['lavorazione'] || '',
                
                'l0-cont': row['loc-0-contenitore'] || '',
                'l0-city': row['loc-0-comune'] || '',
                'l0-prov': row['loc-0-prov'] || '',

                'l1-cont': row['loc-1-contenitore'] || '',
                'l1-city': row['loc-1-comune'] || '',
                'l1-prov': row['loc-1-prov'] || '',

                'l2-cont': row['loc-2-contenitore'] || '',
                'l2-city': row['loc-2-comune'] || '',
                'l2-prov': row['loc-2-prov'] || '',

                'url': row['id'] || ''

                // to add: path to main image
            }));

            if (data.length === 1) { // Exception for singular/plural
                document.getElementById("tot-results").innerHTML = data.length + " opera";
            } else {
                document.getElementById("tot-results").innerHTML = data.length + " opere";
            }

            /* 

            Ipotizzabile che qui chiamerai la funzione di query e tramite ID
            selezionerai solo i risultati che ti interessano ottenendo
            un nuovo array che va a sostituire data in rr. 57 e seguenti

            */ 

            renderResults(currentPage, data, isGrid = false);
            renderFilters(data)
        }
    });

    return data;
}

// *** MINIBATCH QUERYING FUNCTIONS ***

// function miniBatchQuery(...) {}

// *** DATA VISUALIZATION FUNCTIONS ***

// *************
// ** Results **
// *************

function renderResults(page, data, isGrid = false) {

    if(!isGrid) {

        // Option A. List view

        console.log($('#resultsGrid').text(), $('#resultsList').text())
        $('#resultsList').empty();
        $('#resultsGrid').empty();

        const itemsPerPage = 15;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);

        pageData.forEach(item => { 

            // Create the single list
            const listItem = `
                        <div class="card mb-1">
                            <div class="row g-0">
                                <div class="col-md-4 col-sm-12">
                                    <a href="schede/${item['url']}.html"><img src="assets/img/img-placeholder.png" class="img-fluid rounded-start query-card-img" alt="${item['author']} ${item['author-rif'] ? `(${item['author-rif']})` : ''} ${item['subj']}" style="max-height: 200px; width: 100%"></a>
                                </div>
                                <div class="col-md-8 col-sm-12">
                                    <div class="card-body">
                                        <p class="card-text">${item['author']} ${item['author-rif'] ? `(${item['author-rif']})` : ''}</p>
                                        <p class="card-text fw-bold"><a href="schede/${item['url']}.html" class="query-result-obj-id">${item['subj']}</a></p>
                                        <p class="card-text">${item['date-from']} ${item['date-from'] ? ` - ${item['date-to']}` : `${item['date-to']}`}</p>
                                        <p class="card-text">${createLocLabel(item)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
            $('#resultsList').append(listItem);
            
            renderPagination(page, data, itemsPerPage);
        });

    } else {

        // Option B. Grid view

        $('#resultsList').empty();
        $('#resultsGrid').empty();

        const itemsPerPage = 30;
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageData = data.slice(startIndex, endIndex);

        pageData.forEach(item => { 

            // Create the single grid
            const gridItem = `
                        <div class="col-md-4 col-sm-12 d-flex mt-2 justify-content-center">
                            <div class="card d-flex flex-column" style="width: 15rem;" onclick="location.href='schede/${item['url']}.html'">
                                <img src="assets/img/img-placeholder.png" class="card-img-top" alt="${item['author']} ${item['author-rif'] ? `(${item['author-rif']})` : ''} ${item['subj']}">
                                <div class="card-body d-flex flex-column">
                                        <small class="card-text">
                                            ${item['author']} ${item['author-rif'] ? `(${item['author-rif']})` : ''} <br>
                                            ${item['subj']},
                                            ${item['date-from']} ${item['date-from'] ? ` - ${item['date-to']}` : `${item['date-to']}`}
                                        </small>
                                </div>
                            </div>
                        </div>
                    `;
            // , ${createLocLabel(item)}
            console.log(gridItem);

            $('#resultsGrid').append(gridItem);
            
            renderPagination(page, data, itemsPerPage);
        });

    }

}

// *** Ancillary functions for filters ***

// 1. createLocLabel, to create the label for the location

function createLocLabel(item) {
    let locationText = ''; // Create the label for the location

    if(item['l0-cont']) {
        if(item['l0-city']) {
            locationText = `${item['l0-cont']}, `;
        } else if (item['l0-prov']) {
            locationText = `${item['l0-cont']} `;
        } else {
            locationText = `${item['l0-cont']}`;
        }
    }

    if(item['l0-city']) {
        if (item['l0-prov']) {
            locationText += `${item['l0-city']} `;
        } else {
            locationText += `${item['l0-city']}`;
        }
    }

    if (item['l0-prov']) {
        if (!item['l0-city']) {
            locationText += `Provincia di ${item['l0-prov']}`;
        } else {
            locationText += `(${item['l0-prov']})`;
        }
    }

    return locationText;
}

// 2. renderPagination, to paginate with Bootstrap

function renderPagination(page, data, itemsPerPage) {

    const totalPages = Math.ceil(data.length / itemsPerPage);
    $('#pagination').empty();

    let paginationHtml = '';

    // Show first page
    paginationHtml += `<li class="page-item ${page === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="renderResults(1, data, isGrid)">1</a>
    </li>`; 

    // If necessary, add ellipsis
    if (page > 3) {
        paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }

    // Show adjacent pages
    const startPage = Math.max(2, page - 2);
    const endPage = Math.min(totalPages - 1, page + 2);
    for (let i = startPage; i <= endPage; i++) {
        paginationHtml += `
            <li class="page-item ${i === page ? 'active' : ''}">
                <a class="page-link" href="#" onclick="renderResults(${i}, data, isGrid)">${i}</a>
            </li>
        `;
    }

    // If necessary, add ellipsis
    if (page < totalPages - 2) {
        paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    } 

    // Show last page
    if (totalPages > 1) {
        paginationHtml += `<li class="page-item ${page === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="renderResults(${totalPages}, data, isGrid)">${totalPages}</a>
        </li>`;
    }

    $('#pagination').append(paginationHtml);
}

// 3. sortData, so that user can rearrange the content

function sortData(criterion) {
    let sortedData;

    sortedData = [...data].sort((a, b) => {
        if(criterion === 'date-from') {  // specific to handle dates
            return new Date(a[criterion]) - new Date(b[criterion]);
        } else {
            return a[criterion]?.localeCompare(b[criterion] || ''); // checking if exists
        }
    });

    renderResults(currentPage, sortedData);  // Rende la lista ordinata
}

// *************
// ** Filters **
// *************

function renderFilters(data) {

    // Accordion section: Autore
    renderFreqTableInAccordion(data, ['author'], 'Autore', true, true);

    // Accordion section: Altre attribuzioni
    renderFreqTableInAccordion(data, ['author-1', 'author-2', 'author-3'], 'Altre attribuzioni', false, true);

    // Accordion section: Cronologia
    const accordionChronoItem = `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseDatazione" aria-expanded="false" aria-controls="collapseDatazione">
                    Datazione
                </button>
            </h2>

            <div id="collapseDatazione" class="accordion-collapse collapse" data-bs-parent="#accordionQuery">
                <div class="accordion-body accordion-query-body">
                    <p>Restringi gli estremi cronologici della tua ricerca</p>
                    
                    <form class="form-inline">
                        <div class="form-row"> 
                            <div class="form-group mx-sm-3 mb-2">
                                <input type="password" class="form-control" id="inputDateFrom" placeholder="Da anno">
                            </div>
                        
                            <div class="form-group mx-sm-3 mb-2">
                                <input type="password" class="form-control" id="inputDateFrom" placeholder="a anno">
                            </div>
                        </div>
                        <div class="d-flex align-items-center">
                            <button type="submit" style="margin:auto" class="btn btn-primary mb-2"><i class="bi bi-search"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>`;
    $('#accordionQuery').append(accordionChronoItem);

    // Accordion section: Ubicazione attuale
    renderFreqTableInAccordion(data, ['l0-city', 'l0-cont'], 'Ubicazione attuale', false, true);

    // Accordion section: Ubicazione precedenti
    renderFreqTableInAccordion(data, [['l1-city', 'l1-cont'], ['l2-city', 'l2-cont']], 'Ubicazioni precedenti', false, true);
    // Accordion section: Soggetto
    renderFreqTableInAccordion(data, ['subj'], 'Soggetto', false, true);

    // Accordion section: Oggetto
    renderFreqTableInAccordion(data, ['obj-def'], 'Oggetto');

    // Accordion section: Tecnica
    renderFreqTableInAccordion(data, ['tech'], 'Tecnica');

    // Accordion section: Lavorazione
    renderFreqTableInAccordion(data, ['lav'], 'Lavorazione');

}

// *** Main ancillary function for filters ***
// ==> renderFreqTableInAccordion, to render accordion containing frequency tables

function renderFreqTableInAccordion(data, property, label, isFirst = false, hasSortingButton = false, isByName = false) {

    // Generate the first row of the frequency table using Bootstrap columns
    const content = retrieveFreqData(data, property, label, isByName)
        .map(([key, count]) => `<div class="row"><div class="col-10">${key}</div><div class="col-2 text-end">${count}</div></div>`)
        .join('');

    const safeLabel = label.replace(/[^a-zA-Z0-9]/g, '-'); // Respect syntax for accordion label

    if (hasSortingButton) {
        const accordionItem = `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button ${isFirst ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${safeLabel}" aria-expanded="${isFirst}" aria-controls="collapse${safeLabel}">
                    ${label}
                </button>
            </h2>
            <div id="collapse${safeLabel}" class="accordion-collapse collapse ${isFirst ? 'show' : ''}" data-bs-parent="#accordionQuery">
                <div class="accordion-body accordion-query-body">
                <div class="container">
                    <div class="row mb-2">
                        <div class="col-10 d-flex justify-content-end">
                        <button class="btn btn-primary accordion-filter-button" onclick="resortFilter('${label}', true)"><i class="bi bi-sort-alpha-down"></i></button>
                        </div>
                        <div class="col-2 d-flex justify-content-end">
                        <button class="btn btn-primary accordion-filter-button" onclick="resortFilter('${label}', false)"><i class="bi bi-sort-numeric-down-alt"></i></button>
                        </div>
                </div>
                <div id="content-${label}" class="mt-1">
                    ${content}
                </div>
                </div>
            </div>
        </div>`;
        $('#accordionQuery').append(accordionItem);
    } else {
        const accordionItem = `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button ${isFirst ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${safeLabel}" aria-expanded="${isFirst}" aria-controls="collapse${safeLabel}">
                    ${label}
                </button>
            </h2>
            <div id="collapse${safeLabel}" class="accordion-collapse collapse ${isFirst ? 'show' : ''}" data-bs-parent="#accordionQuery">
                <div class="accordion-body accordion-query-body">
                    ${content}
                </div>
            </div>
        </div>`;

        $('#accordionQuery').append(accordionItem);
    }

}

// *** Other ancillary functions for filters ***

// 1. combineValues, to combine (horizontal) values from two columns

function combineValues(data, col1, col2) {
    return data.map((item) => {

        // Get the values of the two cols ... 
        const val1 = item[col1]?.trim() || '';
        const val2 = item[col2]?.trim() || ''; 

        // ... and combine them in a single string
        if(val1 && val2) {
            return `${val1} (${val2})`; // e.g. Cremona (Museo Civico)
        }

        else if(val1 && !val2) {
            return val1;                // e.g. Mantova         
        }

        else if(!val1 && val2) {
            return val2;                // e.g. Collezione privata
        }
    });
}

// 2. retrieveFreqData, to retrieve the frequency data to insert in the accordion

function retrieveFreqData(data, property, label, isByName) {
    let counts = {};
    let propertyArray = [];

    // Handle exceptions for repeated fields of the dataset

    if (label === "Altre attribuzioni") {          // Except. 1: Other artists 

        for (const prop of property) {
            for (const element of data.map((row) => row[prop]).filter(val => val)) {
                propertyArray.push(element);
            }
        }

    } else if (label === "Ubicazioni precedenti") { // Except. 2: Other locations

        for (const prop of property) {
            for (const element of combineValues(data, prop[0], prop[1]).filter(val => val)) {
                propertyArray.push(element);
            }
        }

    } else {

        propertyArray = combineValues(data, property[0], property[1]).filter(val => val);
    
    }

    for (const element of propertyArray) {          // Main case (no exceptions)      
        
        if (element.includes(';')) { // Split the values with the delimiter ";"
            const splittedVal = element.split('; '); // e.g. Maestro degli angeli cantori; G. de Fondulis
            for (const val of splittedVal) {
                counts[val] = counts[val] ? counts[val] + 1 : 1;
            }
        } else {    
            // Main case (no delimiter)
            counts[element] = counts[element] ? counts[element] + 1 : 1;
        }
    }

    const sortedEntries = Object.entries(counts);

    // Sort the entries
    if (isByName) {
        // Alphabetically
        sortedEntries.sort((a, b) => a[0].localeCompare(b[0]));
    } else {
        // By value
        sortedEntries.sort((a, b) => b[1] - a[1]);
    }

    return sortedEntries;
}

// 3. resortFilter, to allow to toggle between alphabetical and by value sorting

function resortFilter(label, isByName = false) {

    // Use the label as a key to retrieve the property and rerun renderFreqTableInAccordion
    let property = [];

    if (label === "Autore") {
        property = ['author'];
    }
    else if (label === "Altre attribuzioni") {
        property = ['author-1', 'author-2', 'author-3'];
    }
    else if (label === "Ubicazione attuale") {
        property = ['l0-city', 'l0-cont'];
    }
    else if (label === "Ubicazioni precedenti") {
        property = [['l1-city', 'l1-cont'], ['l2-city', 'l2-cont']];
    }
    else if (label === "Soggetto") {
        property = ['subj'];
    }
    else if (label === "Oggetto") {
        property = ['obj-def'];
    }
    else if (label === "Tecnica") {
        property = ['tech'];
    }
    else if (label === "Lavorazione") {
        property = ['lav'];
    }

    const content = retrieveFreqData(data, property, label, isByName)
        .map(([key, count]) => `<div class="row"><div class="col-10">${key}</div><div class="col-2 text-end">${count}</div></div>`)
        .join('');

    // Replace the content of the accordion
    var accordionContent = document.getElementById(`content-${label}`) ;
    accordionContent.innerHTML = content;
}

// ***************************
// ** Other functionalities **
// ***************************

// 1. load CSV data and render the results
$(document).ready(function () {
    loadCSV();
    var isGrid = false;
});

// 2. change viz system with "viz_mode" toggle button

document.getElementById('viz_mode').addEventListener('change', function () {
    if (this.checked) {
        // Page in grid mode
        renderResults(currentPage, data, isGrid = true);
        return isGrid = true;
    } else {
        // Page in list mode
        renderResults(currentPage, data, isGrid = false);
        return isGrid = false;
    }
});