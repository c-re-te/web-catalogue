const itemsPerPage = 15;  // Numero di risultati per pagina
let currentPage = 1;
let data = [];

// Funzione per caricare il CSV usando PapaParse
function loadCSV() {
    Papa.parse('./assets/data/sample-query.csv', {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            // Carica i dati nel formato desiderato
            data = results.data.map(row => ({
                AUTORE: row['AUTORE'] || '',
                'SPECIFICHE-AUTORE': row['SPECIFICHE-AUTORE'] || '',

                'AUTORE-ALT1': row['ALTRO-AUTORE-1'] || '',
                'AUTORE-ALT1-SPEC': row['ALTRO-AUTORE-1-SPECIFICHE-AUTORE'] || '',

                'AUTORE-ALT2': row['ALTRO-AUTORE-2'] || '',
                'AUTORE-ALT2-SPEC': row['ALTRO-AUTORE-2-SPECIFICHE-AUTORE'] || '',
                
                'SOGGETTO': row['SOGGETTO'] || '',

                'LAVORAZIONE': row['LAVORAZIONE'] || '',
                
                'LOC0-CONT': row['LOC0-CONT'] || '',
                'LOC0-CITTA': row['LOC0-CITTA'] || '',
                'LOC0-PROV': row['LOC0-PROV'] || '',

                'LOC1-CONT': row['LOC1-CONT'] || '',
                'LOC1-CITTA': row['LOC1-CITTA'] || '',
                'LOC1-PROV': row['LOC1-PROV'] || '',

                'LOC2-CONT': row['LOC2-CONT'] || '',
                'LOC2-CITTA': row['LOC2-CITTA'] || '',
                'LOC2-PROV': row['LOC2-PROV'] || '',
                
                'DATA-FROM': row['DATA-FROM'] || '',
                'DATA-TO': row['DATA-TO'] || '',

                OBJID: row['OGGETTO-DEFINIZIONE'] || '',

                TECNICA: row['TECNICA'] || '',
                LAVORAZIONE: row['LAVORAZIONE'] || '',

                'URL': row['ID'],
            }));

            document.getElementById("tot-results").innerHTML = data.length
            // Dopo aver caricato i dati, mostra la prima pagina
            renderList(currentPage, data);
    
            const combinedAuthors = combineValues(data, 'AUTORE', 'SPECIFICHE-AUTORE');
            renderAccordionSectionFromArray(combinedAuthors, 'Autori', true);

            const combinedOtherAuthors1 = combineValues(data, 'AUTORE-ALT1', 'AUTORE-ALT1-SPEC');
            const combinedOtherAuthors2 = combineValues(data, 'AUTORE-ALT2', 'AUTORE-ALT2-SPEC');
            const combinedOtherAuthors = combinedOtherAuthors1.concat(combinedOtherAuthors2);

            renderAccordionSectionFromArray(combinedOtherAuthors, 'Altre Attribuzioni');

            renderAccordionSection(['SOGGETTO'], 'Soggetti');

            renderAccordionSection(['OBJID'], 'Oggetti (definizione)');

            const combinedOtherLoc1 = combineValues(data, 'LOC1-CITTA', 'LOC1-CONT');
            const combinedOtherLoc2 = combineValues(data, 'LOC2-CITTA', 'LOC2-CONT');
            const combinedOtherLocs = combinedOtherLoc1.concat(combinedOtherLoc2);

            renderAccordionSectionFromArray(combinedOtherLocs, 'Provenienza');

            renderAccordionSection(['LAVORAZIONE'], 'Lavorazione della superficie');
        }
    });
}

// *************
// ** RESULTS **
// *************

function renderList(page, data) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);

    $('#resultsList').empty();

    // *** CONTENT ***
    pageData.forEach(item => {
        const listItem = `
                    <div class="card mb-1">
                        <div class="row g-0">
                            <div class="col-md-4 col-sm-12">
                                <img src="assets/img/img-placeholder.png" class="img-fluid rounded-start query-card-img" alt="${item.AUTORE} ${item['SPECIFICHE-AUTORE'] ? `(${item['SPECIFICHE-AUTORE']})` : ''} ${item.SOGGETTO}" style="max-height: 200px">
                            </div>
                            <div class="col-md-8 col-sm-12">
                                <div class="card-body">
                                    <p class="card-text">${item.AUTORE} ${item['SPECIFICHE-AUTORE'] ? `(${item['SPECIFICHE-AUTORE']})` : ''}</p>
                                    <p class="card-text fw-bold"><a href="schede/${item.URL}.html" class="query-result-obj-id">${item.SOGGETTO}</a></p>
                                    <p class="card-text">${item['DATA-FROM']} ${item['DATA-FROM'] ? ` - ${item['DATA-TO']}` : `${item['DATA-TO']}`}</p>
                                    <p class="card-text">
                                        ${item['LOC0-CITTA'] ? `${item['LOC0-CONT']},` : ``}
                                        ${item['LOC0-CONT'] ? `${item['LOC0-CITTA']}` : ``}
                                        ${item['LOC0-CITTA'] ? ` (${item['LOC0-PROV']})` : ``}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        $('#resultsList').append(listItem);
    });

    // *** PAGINATION ***
    const totalPages = Math.ceil(data.length / itemsPerPage);
    $('#pagination').empty();

    let paginationHtml = '';

    // Mostra la prima pagina
    paginationHtml += `<li class="page-item ${page === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" onclick="renderList(1)">1</a>
    </li>`;

    // Aggiungi ellissi se necessario
    if (page > 3) {
        paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }

    // Pagine circostanti alla pagina corrente
    const startPage = Math.max(2, page - 2);
    const endPage = Math.min(totalPages - 1, page + 2);
    for (let i = startPage; i <= endPage; i++) {
        paginationHtml += `
            <li class="page-item ${i === page ? 'active' : ''}">
                <a class="page-link" href="#" onclick="renderList(${i})">${i}</a>
            </li>
        `;
    }

    // Aggiungi ellissi se necessario
    if (page < totalPages - 2) {
        paginationHtml += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }

    // Mostra l'ultima pagina
    if (totalPages > 1) {
        paginationHtml += `<li class="page-item ${page === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="renderList(${totalPages})">${totalPages}</a>
        </li>`;
    }

    $('#pagination').append(paginationHtml);
}

// *************
// ** FILTERS **
// *************

// For merged multiple columns 

function combineValues(data, col1, col2) { // Combina i valori di due colonne
    return data.map(item => {
        const val1 = item[col1]?.trim() || ''; // Prende il valore della prima colonna (o stringa vuota)
        const val2 = item[col2]?.trim() || ''; // Prende il valore della seconda colonna (o stringa vuota)

        // Combina i valori, escludendo separatori inutili
        if(val1 && val2) {
            return `${val1} (${val2})`; // Città (Collocazione)
        }

        else if(val1 && !val2) {
            return val1;
        }

        else if(!val1 && val2) {
            return val2;
        }
    });
}

function renderAccordionSectionFromArray(values, label, bool = false) {
    const counts = {};
    values.forEach(value => {
        if (value) {
            // Separiamo i valori con il delimitatore ";"
            const separatedValues = value.split(';');

            // Conta separatamente ciascun valore
            separatedValues.forEach(val => {
                const trimmedVal = val.trim(); // Rimuove gli spazi prima e dopo
                if (trimmedVal) {
                    counts[trimmedVal] = (counts[trimmedVal] || 0) + 1;
                }
            });
        }
    });

    const sortedCounts = Object.entries(counts)
        .sort((a, b) => b[1] - a[1]); // Ordina per valore della frequenza (indice 1)

    const content = sortedCounts
        .map(([key, count]) => `<div class="row"><div class="col-10">${key}</div><div class="col-2 text-end">${count}</div></div>`).join('');
    
    const safeLabel = label.replace(/[^a-zA-Z0-9]/g, '-');
    let accordionItem;
    
    if(bool) {
        accordionItem = `  
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${safeLabel}" aria-expanded="true" aria-controls="collapse${safeLabel}">
                    ${label}
                </button>
            </h2>

            <div id="collapse${safeLabel}" class="accordion-collapse collapse show" data-bs-parent="#accordionQuery">
                <div class="accordion-body accordion-query-body">${content}</div>
            </div>
        </div>`;

    } else {
        accordionItem = `  
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${safeLabel}" aria-expanded="false" aria-controls="collapse${safeLabel}">
                    ${label}
                </button>
            </h2>

            <div id="collapse${safeLabel}" class="accordion-collapse collapse" data-bs-parent="#accordionQuery">
                <div class="accordion-body accordion-query-body">${content}</div>
            </div>
        </div>`;
    }
    
    $('#accordionQuery').append(accordionItem);
}

// For single columns 

function countByProperties(properties) {
    const counts = {};
    data.forEach(item => {
        const key = properties
            .map(prop => item[prop] || '')
            .filter(val => val.trim() !== '')
            .join(' ');
            if (key) {
                // Separiamo i valori con il delimitatore ";"
                const separatedValues = key.split(';');
    
                // Conta separatamente ciascun valore
                separatedValues.forEach(val => {
                    const trimmedVal = val.trim(); // Rimuove gli spazi prima e dopo
                    if (trimmedVal) {
                        counts[trimmedVal] = (counts[trimmedVal] || 0) + 1; // Incrementa il conteggio
                    }
                });
            }
    });
    return counts;
}

function renderAccordionSection(properties, label) {
    const counts = countByProperties(properties);

    const content = Object.entries(counts)
        .map(([key, count]) => `<div class="row"><div class="col-10">${key}</div><div class="col-2">${count}</div></div>`).join('');
    
    const safeLabel = label.replace(/[^a-zA-Z0-9]/g, '-');
    const accordionItem = `
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${safeLabel}" aria-expanded="false" aria-controls="collapse${safeLabel}">
                    ${label}
                </button>
            </h2>

            <div id="collapse${safeLabel}" class="accordion-collapse collapse" data-bs-parent="#accordionQuery">
                <div class="accordion-body accordion-query-body">${content}</div>
            </div>
        </div>`;

    $('#accordionQuery').append(accordionItem);
}

// *************
// ** SORTING **
// *************

// Funzione per ordinare i dati in base al criterio
function sortData() {
    let sortedData;
    var criteria = document.getElementById("sortSelect").value;

    // Ordinamento per autore
    if (criteria === 'author') {
        sortedData = [...data].sort((a, b) => a.AUTORE.localeCompare(b.AUTORE)); 
    } 
    // Ordinamento per località
    else if (criteria === 'location') {
        sortedData = [...data].sort((a, b) => {
            // Assicurati che 'LOC0-CITTA' sia presente e non nullo
            return a['LOC0-CITTA']?.localeCompare(b['LOC0-CITTA'] || '');
        });
    } 
    // Ordinamento per data (assicurati che 'DATA-FROM' sia una data valida)
    else if (criteria === 'date') {
        sortedData = [...data].sort((a, b) => {
            // Converte le date in formato timestamp per il confronto
            return new Date(a['DATA-FROM']) - new Date(b['DATA-FROM']); 
        });
    } 
    // Ordinamento per oggetto
    else if (criteria === 'object') {
        sortedData = [...data].sort((a, b) => a.OBJID.localeCompare(b.OBJID));
    } 
    // Ordinamento per soggetto (corretto con localeCompare per le stringhe)
    else if (criteria === 'subject') {
        sortedData = [...data].sort((a, b) => a.SOGGETTO.localeCompare(b.SOGGETTO)); 
    }

    renderList(currentPage, sortedData);  // Rende la lista ordinata
}

// Carica il CSV quando la pagina viene caricata
$(document).ready(function () {
    loadCSV();
});