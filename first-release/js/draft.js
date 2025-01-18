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
                
                'SOGGETTO': row['SOGGETTO'] || '',

                'LAVORAZIONE': row['LAVORAZIONE'] || '',
                
                'LOC0-CONT': row['LOC0-CONT'] || '',
                'LOC0-CITTA': row['LOC0-CITTA'] || '',
                'LOC0-PROV': row['LOC0-PROV'] || '',
                
                'DATA-FROM': row['DATA-FROM'] || '',
                'DATA-TO': row['DATA-TO'] || '',

                OBJID: row['OGGETTO-DEFINIZIONE'] || '',

                TECNICA: row['TECNICA'] || '',
                LAVORAZIONE: row['LAVORAZIONE'] || '',

                'URL': row['ID'],
            }));


            // Dopo aver caricato i dati, aggiungi le sezioni dell'accordion
            setTimeout(() => {
            // A) Conteggio basato su una sola colonna
            renderAccordionSection(['SOGGETTO'], 'Soggetto');
            renderAccordionSection(['OBJID'], "Definizione dell'oggetto");

            // B) Conteggio combinato di due o più colonne
            renderAccordionSection(['TECNICA', 'LAVORAZIONE'], 'Tecnica e Lavorazione');

            // C) Conteggio su una colonna unita (es. AUTORE + SPECIFICHE-AUTORE)
            //renderAccordionSection(['AUTORE', 'SPECIFICHE-AUTORE'], 'Autori completi', true);
            }, 1000); // Attendi che i dati siano caricati
        }
    });
}

// ID,AUTORE,ULAN,SPECIFICHE-AUTORE,SCUOLA,AUTORE-MOTIVAZIONE,ALTRO-AUTORE-1,ALTRO-AUTORE-1-ULAN,ALTRO-AUTORE-1-SPECIFICHE-AUTORE,ALTRO-AUTORE-1-SCUOLA,ALTRO-AUTORE-1-MOTIVAZIONE,ALTRO-AUTORE-2,ALTRO-AUTORE-2-ULAN,ALTRO-AUTORE-2-SPECIFICHE-AUTORE,ALTRO-AUTORE-2-SCUOLA,ALTRO-AUTORE-2-MOTIVAZIONE,ALTRO-AUTORE-3,ALTRO-AUTORE-3-ULAN,ALTRO-AUTORE-3-SPECIFICHE-AUTORE,ALTRO-AUTORE-3-SCUOLA,ALTRO-AUTORE-3-MOTIVAZIONE,OGGETTO-DEFINIZIONE,OGGETTO-ID,SOGGETTO,DENOMINAZIONE,TECNICA,LAVORAZIONE,DIMENSIONI,LOC0-PROV,LOC0-CITTA,LOC0-GEONAMES,LOC0-LAT,LOC0-LONG,LOC0-CONT,LOC0-CONT-SPECIFICHE,ORIGINALE-BOOL,LOC1-TYPE,LOC1-PROV,LOC1-CITTA,LOC1-GEONAMES,LOC1-CONT,LOC1-CONT-SPECIFICHE,LOC1-DATE,LOC2-TYPE,LOC2-PROV,LOC2-CITTA,LOC2-GEONAMES,LOC2-CONT,LOC2-CONT-SPECIFICHE,LOC2-DATE,DATA-FROM,DATA-TO,RELAZIONE,BIBLIOGRAFIA-GENERALE


// *** FILTERS ***
// Funzione per calcolare i conteggi
function countByProperties(properties) {
    const counts = {};
    data.forEach(item => {
        let key;
        // Considera solo la prima proprietà per conteggio singolo
        key = item[properties[0]] || '';

        if (key) {
            counts[key] = (counts[key] || 0) + 1;
        }
    });
    return counts;
}

function combineValues(properties) {
    data.forEach(item => {
        let key;
        // Combina i valori delle proprietà in una chiave unica
        key = properties
        .map(prop => item[prop] || '') // Recupera i valori delle colonne
        .filter(val => val.trim() !== '') // Escludi valori vuoti
        .join(' '); // Combina con spazio
    }); 
}

// Funzione per creare una sezione nell'accordion
function renderAccordionSection(properties, label, combineValues = false) {
    const counts = countByProperties(properties, combineValues);

    $('#accordionQuery').empty();

    // Creazione del contenuto della sezione
    const content = Object.entries(counts)
        .map(([key, count]) => `<li>${key}: (${count})</li>`)
        .join('');

    // Crea una nuova sezione dell'accordion
    const accordionItem = `
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${label}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${label}" aria-expanded="false" aria-controls="collapse${label}">
                    ${label}
                </button>
            </h2>
            <div id="collapse${label}" class="accordion-collapse collapse" aria-labelledby="heading${label}" data-bs-parent="#accordionQuery">
                <div class="accordion-body">
                    <ul>${content}</ul>
                </div>
            </div>
        </div>
    `;

    // Aggiungi la nuova sezione all'accordion
    $('#accordionQuery').append(accordionItem);
}


// Carica il CSV quando la pagina viene caricata
$(document).ready(function () {
    loadCSV();
});