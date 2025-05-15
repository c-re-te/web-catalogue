// Further ancillary functions to generate bibliography

// A. From id retrive data of the citation
function retrieveBibData(bibId) {
    let ref;

    bibData.forEach (function (item) {
        if (item["ID"] === bibId) {
            ref = item;
        }
    }); 

    console.log(ref);
    return ref;
}
 
// B. Update motivation field in authorships attribution
function refineMotivationField(cell) {

    // Is bibliography a motivation?
    if (cell.includes("Bibliografia")) {
        let newMotivString = cell;

        console.log(cell);
        // Iterate to handle multiple motivations
        cell.split(";").forEach(function (item) {
            if (item.includes("Bibliografia (")) {

                // Create in-text citation with ad hoc function and update motivation
                let bibID = item.split("(")[1].replace(")", "").trim();
                let ref = retrieveBibData(bibID);
                let citation = ref["AUTORE"].replace(/\b[A-Z]\./g, '') + ref["ANNO"]

                // Update the string
                newMotivString = newMotivString.replace(bibID, citation);
            }
        });

        return newMotivString;
    } 

    return cell;
}

// ---------------------------
// Minor function to get full references of different types
function getAuthorString(row) {
    return row['AUTORE'] ? String(row['AUTORE']) : String(row['CURATORE']);
}

function getArticle(row) {
    let refFirst = `${row['AUTORE']}, «${row['TITOLO CONTRIBUTO SPECIFICO']}», <i>${row['TITOLO VOLUME/RIVISTA']}</i>, `;
    if (row['SPECIFICHE EDIZIONE']) refFirst += `${row['SPECIFICHE EDIZIONE']}, `;
    if (row['NOTE GENERALI']) refFirst += `${row['NOTE GENERALI']}, `;
    refFirst += `${row['ANNO']}`;
    return row['PAGINE'] ? `${refFirst}, pp. ${row['PAGINE']}.` : `${refFirst}`;
}

function getMonograph(row) {
    let refFirst =  row['AUTORE'] ? `${row['AUTORE']}, ` : (row['CURATORE'] ? `${row['CURATORE']} (a cura di), ` : ``);
    refFirst += `<i>${row['TITOLO VOLUME/RIVISTA']}</i>, `;
    if (row['SPECIFICHE EDIZIONE']) refFirst += `${row['SPECIFICHE EDIZIONE']}, `;
    if (row['NOTE GENERALI']) refFirst += `${row['NOTE GENERALI']}, `;
    if (row['EDITORE']) refFirst += `${row['EDITORE']}, `;
    if (row['LUOGO EDIZIONE']) refFirst += `${row['LUOGO EDIZIONE']}, `;
    return `${refFirst}${row['ANNO']}`;
}

function getEssayInBook(row) {
    let refFirst = `${row['AUTORE']}, «${row['TITOLO CONTRIBUTO SPECIFICO']}», in `;
    if (row['CURATORE']) refFirst += `${row['CURATORE']}, `;
    refFirst += `<i>${row['TITOLO VOLUME/RIVISTA']}</i>, `;
    if (row['SPECIFICHE EDIZIONE']) refFirst += `${row['SPECIFICHE EDIZIONE']}, `;
    if (row['NOTE GENERALI']) refFirst += `${row['NOTE GENERALI']}, `;
    refFirst += `${row['EDITORE']}, ${row['LUOGO EDIZIONE']}, ${row['ANNO']}`;
    return row['PAGINE'] ? `${refFirst}, pp. ${row['PAGINE']}.` : `${refFirst}`;
}

function getEntry(row) {
    let refFirst = `${row['AUTORE']}, «${row['TITOLO CONTRIBUTO SPECIFICO']}», in `;
    if (row['CURATORE']) refFirst += `${row['CURATORE']}, `;
    refFirst += `<i>${row['TITOLO VOLUME/RIVISTA']}</i>, `;
    if (row['SPECIFICHE EDIZIONE']) refFirst += `${row['SPECIFICHE EDIZIONE']}, `;
    if (row['NOTE GENERALI']) refFirst += `${row['NOTE GENERALI']}, `;
    refFirst += `${refFirst}${row['EDITORE']}, ${row['LUOGO EDIZIONE']}, ${row['ANNO']}`;
    return row['PAGINE'] ? `${refFirst}, pp. ${row['PAGINE']}.` : `${refFirst}`;
}

function getThesis(row) {
    let refFirst = `${row['AUTORE']}, <i>${row['TITOLO VOLUME/RIVISTA']}</i>, `;
    if (row['EDITORE']) refFirst += `${row['EDITORE']}, `;
    if (row['SPECIFICHE EDIZIONE']) refFirst += `${row['SPECIFICHE EDIZIONE']}, `;
    if (row['NOTE GENERALI']) refFirst += `${row['NOTE GENERALI']}, `;
    return `${refFirst}${row['ANNO']}`;
}

function getFullRef(row) {
    switch (row['TIPO']) {
        case 'Articolo in periodico': return getArticle(row);
        case 'Monografia': return getMonograph(row);
        case 'Saggio in volume': 
        case 'Scheda di catalogo': return getEssayInBook(row);
        case 'Tesi': return getThesis(row);
        default: return '';
    }
}
// -----------------------

// C. Get full reference from the bibData

// From a cell get the list of strings (formatted references)
function retrieveBib(cell) {
    let citationData = [];
    let listOfRef = cell.split(";").map(item => item.trim().split(","));
    listOfRef.forEach(function (item) {
        citationData.push({"data": retrieveBibData(item[0]), "pages": item[1]}); // Do not focus on pages
    });

    let htmlBib = [];
    console.log(cell);
    citationData.forEach(function (item) {
        let bibRef = getFullRef(item["data"]);

        // Avoid repetition of pages in the reference
        if (bibRef.includes("p.") && item["pages"]) {
            if (bibRef.includes("pp. ")) {
                bibRef = bibRef.split(", pp. ")[0].trim();
            } else {
                bibRef = bibRef.split(", p. ")[0].trim();
            }
        }
        //

        htmlBib.push(bibRef + `${item["pages"] ? `, p. ${item["pages"].trim()}` : ""}.`);
    });
    return htmlBib
}

function getBibString(cell) {
    let listOfHTMLRef = retrieveBib(cell).map((x) => `<p class="fs-5">${x}</p>`);
    return listOfHTMLRef.join("\n");
}