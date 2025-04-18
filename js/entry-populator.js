let filteredData = [];
let bibData = [];

// *********** SECTION 1. *************
// * Load data with PapaParse (async) *
// ************************************

async function loadMainCSV() {
    return new Promise((resolve, reject) => {
        Papa.parse("../assets/data/data-test-jan25.csv", {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: results => resolve(results.data),
            error: error => reject(new Error("Errore nel caricamento CSV: " + JSON.stringify(error)))
        });
    });
}

async function loadBibCSV() {
    return new Promise((resolve, reject) => {
        Papa.parse("../assets/data/biblio.csv", {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: results => resolve(results.data),
            error: error => reject(new Error("Errore nel caricamento CSV: " + JSON.stringify(error)))
        });
    });
}

// Ancillary function to select the correct artwork
function filterById(data, str) {
    return data.filter(item => String(item.id) === String(str));
}

async function init() {
    try {
        // A. Load data with async function
        const data = await loadMainCSV();
        bibData = await loadBibCSV();
        
        // B. Get the current artwork. E.g. entry.html?no=1
        // .split("?") = [entry.html, no=1]
        // - - - .split("=") = [no, 1]

        const id_entry = window.location.search.split("?")[1].split("=")[1]
        filteredData = filterById(data, id_entry)[0];

        uploadData(filteredData);

    } catch (error) {
        console.error(error);
    }
}

init()

// ********* SECTION 2. **********
// ** Replace data in HTML file **
// *******************************

// ANCILLARY FUNCTIONS

// 1. Set capital letter for first letter
function capitalizeFirstLetter(string) {
    if (typeof string !== 'string' || string.length === 0) {
      return ''; // Handle non-string inputs or empty strings
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// 2. Retrieve info of bibliography > See bib-generator.js

// 3. Location text from a list of location data (1 list = 1 location)
function createLocLabel(locList) { // locList = [data["loc-0-prov"], data["loc-0-comune"], data["loc-0-contenitore"], <chronology for previous locations>]
    
    let locationText = ''; // Create the label for the location

    if(locList[2]) { // If container...
        if(locList[1]) {
            locationText = `${locList[2]}, `;
        } else if (locList[0]) {
            locationText = `${locList[2]} `;
        } else {
            locationText = `${locList[2]}`;
        }
    }

    if(locList[1]) { // If city...
        locationText += `<a href="../query.html?city=${encodeURIComponent(locList[1])}">${locList[1]}</a>`;

        if (locList[0]) {
            locationText += " ";
        }
    }

    if (locList[0]) { // If province...
        if (locList[1]) {
            locationText += `(${locList[0]})`;
        }
    }

    if(locList[2].toLowerCase() == "collezione privata") { // To handle "Collezione privata"
        locationText = "Collezione privata";
    };
    
    if(locList.length > 3) { // Chronology for previous locations
        locationText += `${locList[3] ? `, ${locList[3]}` : ""}`;
    }
    return locationText;
}


// ***********************
// ***********************
// ***********************

// UPDATE HTML with JQuery
function uploadData(data) {

    // == Main title (h2) and header in meta ==
    $("#meta-head").html(data["autore-0-name"] + 
        (data["autore-0-ref"] ? " (" + data["autore-0-ref"] + ")" : "") +
        ", " + capitalizeFirstLetter(data["soggetto"]) + " (scheda)");

    $("#entry-title").html(data["autore-0-name"] + 
        (data["autore-0-ref"] ? " (" + data["autore-0-ref"] + ")" : "") +
        ", " + capitalizeFirstLetter(data["soggetto"]));
    // =====================

    // == Images ==
    $("#entry-carousel-img-temp").attr("src", ("../assets/img/img-schede-draft/" + data["img-path"]));
    // To update with carousel for more than one image
    // ============

    // == Authors ==
    let authorData = [
        data["autore-0-name"], data["autore-0-url"], data["autore-0-rif"], data["autore-0-ambito"], data["autore-0-motiv"],
        [
            [data["autore-1-name"], data["autore-1-url"], data["autore-1-rif"], data["autore-1-ambito"], data["autore-1-motiv"]],
            [data["autore-2-name"], data["autore-2-url"], data["autore-2-rif"], data["autore-2-ambito"], data["autore-2-motiv"]],
            [data["autore-3-name"], data["autore-3-url"], data["autore-3-rif"], data["autore-3-ambito"], data["autore-3-motiv"]],
            [data["autore-4-name"], data["autore-4-url"], data["autore-4-rif"], data["autore-4-ambito"], data["autore-4-motiv"]]
        ]
    ];

    function getAuthorString(authorData) {
        let authorString = `
        <div class="col-lg-4">
            <p class="fs-5">
                <a href="../query.html?aut=${encodeURIComponent(authorData[0])}">${authorData[0]}</a> 
                ${authorData[1] ? `<sup><a href="${authorData[1]}">[ULAN]</a></sup>` : ""}
                ${authorData[2] ? `<span>(${authorData[2]})</span>` : ""}
            </p>
        </div>
        
        <div class="col-lg-5">
            <p class="fs-5"><span class="fw-bold">Motivazione: </span>${refineMotivationField(authorData[4])}</span></p>
        </div>`

        return authorString;
    }

    $("#entry-first-author").html(
        `<div class="col-lg-3">
            <p class="fs-5 fw-bold">Autore</p>
        </div>
        
        ${getAuthorString(authorData)}`
    );

    if (authorData[5][0][0] !== "") { // If at least one alternative attribution exists
        $("#entry-other-authors").html(
            `<div class="col-lg-3">
                <p class="fs-5 fw-bold">Attribuzioni alternative</p>
            </div>
            ${getAuthorString(authorData[5][0])}

    
            ${authorData[5][1][0] ? `<div class="col-lg-3 col-md-0"></div>${getAuthorString(authorData[5][1])}` : ""}
    
            ${authorData[5][2][0] ? `<div class="col-lg-3 col-md-0"></div>${getAuthorString(authorData[5][2])}` : ""}
    
            ${authorData[5][3][0] ? `<div class="col-lg-3 col-md-0"></div>${getAuthorString(authorData[5][3])}` : ""}
            `
        );
    } else {
        $("#entry-other-authors").html("");
    }
    // =============

    // == Date ==
    $("#entry-from").html(data["data-da"]);
    $("#entry-to").html(data["data-a"]);
    // ==========

    // == Object ==
    $("#entry-obj-id").html(capitalizeFirstLetter(data["oggetto-def"]) + `${data["oggetto-id"] ? ` (${data["oggetto-id"]})` : ""}`);
    // ============

    // == Subject ==
    $("#entry-subj").html(
        `<a href="../query.html?sub=${encodeURIComponent(data["soggetto"])}">
            ${data["soggetto"]}
            ${data["denominazione"] ? ` (${data["denominazione"]})` : ""}</a>
        `);
    // =============

    // == Technique ==
    $("#entry-tech-lav").html(capitalizeFirstLetter(data["tecnica"]) + ", superficie: " + data["lavorazione"]);
    // ===============

    // == Descrizione ==
    $("#entry-desc").html(data["descrizione"]);
    // =================

    // == Dimension ==
    if (data["misure"] !== "") {
        $("#entry-mis-lab").html(`<p class="fs-5 fw-bold">Dimensioni</p>`);
        $("#entry-mis").html(`<p class="fs-5" id="entry-mis">${data["misure"]}</p>`);
    }
    // =================

    // loc-0-prov,loc-0-comune,loc-0-geonames,loc-0-lat,loc-0-long,loc-0-contenitore,loc-0-specifica,loc-0-isOriginal,loc-1-isOriginal,loc-1-prov,loc-1-comune,loc-1-geonames,loc-1-contenitore,loc-1-specifica,loc-1-crono,loc-2-isOriginal,loc-2-prov,loc-2-comune,loc-2-geonames,loc-2-contenitore,loc-2-specifica,loc-2-crono,loc-3-isOriginal,loc-3-prov,loc-3-comune,loc-3-geonames,loc-3-contenitore,loc-3-specifica,loc-3-crono,loc-4-isOriginal,loc-4-prov,loc-4-comune,loc-4-geonames,loc-4-contenitore,loc-4-specifica,loc-4-crono

    // == Location ==
    let locData = [
        [data["loc-0-prov"], data["loc-0-comune"], data["loc-0-contenitore"]],
        [data["loc-1-prov"], data["loc-1-comune"], data["loc-1-contenitore"], data["loc-1-crono"]],
        [data["loc-2-prov"], data["loc-2-comune"], data["loc-2-contenitore"], data["loc-2-crono"]],
        [data["loc-3-prov"], data["loc-3-comune"], data["loc-3-contenitore"], data["loc-3-crono"]],
        [data["loc-4-prov"], data["loc-4-comune"], data["loc-4-contenitore"], data["loc-4-crono"]]
    ];
    $("#entry-current-loc").html(`<p class="fs-5">${createLocLabel(locData[0])}</p>`);

    if (locData[1].some((element) => element !== "")) { // If at least one alternative attribution exists
        $("#entry-other-locs").html(
            `<div class="col-lg-3">
                <p class="fs-5 fw-bold">Localizzazioni precedenti</p>
            </div>
            <div class="col-lg-9"><p class="fs-5">${createLocLabel(locData[1])}</p></div>

    
            ${locData[2].some((element) => element !== "") ? `<div class="col-lg-3 col-md-0"></div><div class="col-lg-9"><p class="fs-5">${createLocLabel(locData[2])}</p></div>` : ""}
    
            ${locData[3].some((element) => element !== "") ? `<div class="col-lg-3 col-md-0"></div><div class="col-lg-9"><p class="fs-5">${createLocLabel(locData[3])}</p></div>` : ""}
    
            ${locData[4].some((element) => element !== "") ? `<div class="col-lg-3 col-md-0"></div><div class="col-lg-9"><p class="fs-5">${createLocLabel(locData[4])}</p></div>` : ""}
            `
        );
    } else {
        $("#entry-other-locs").html("");
    }
    // ==============

    $("#entry-note").html(data["not-storico-critiche"]);       // Nota critica

    // == Conservation State ==
    if (data["stato-conservazione"] !== "") {
        $("#entry-cons-state-lab").html(`<p class="fs-5 fw-bold">Stato di conservazione</p>`);
        $("#entry-cons-state").html(`<p class="fs-5" id="entry-mis">${data["stato-conservazione"]}</p>`);
    }
    // ========================

    // == Restoration ==
    if (data["restauro"] !== "") {
        $("#entry-restoration-lab").html(`<p class="fs-5 fw-bold">Restauri</p>`);
        $("#entry-restoration").html(`<p class="fs-5" id="entry-mis">${data["restauro"]}</p>`);
    }
    // =================

    // = Bibliography =
    $("#entry-bib").html(getBibString(data["bibliografia"])); 
    // ================

    console.log(retrieveBib(data["bibliografia"]));

    // == Relationships ==
    if (data["relazioni"] !== "") {
        $("#entry-rel").html(
            `<div class="col-lg-3">
                <p class="fs-5 fw-bold">Opere associate</p>
            </div>
            <div class="col-lg-9">
                <p class="fs-5"><a href="../query.html?rel=${encodeURIComponent(data["relazioni"])}">${data["relazioni"]} <i class="bi bi-box-arrow-up-right"></i></a></p>
            </div>`);
        }
    // =================

}