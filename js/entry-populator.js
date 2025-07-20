let filteredData = [];
let bibData = [];

// *********** SECTION 1. *************
// * Load data with PapaParse (async) *
// ************************************

async function loadMainCSV() {
    return new Promise((resolve, reject) => {
        Papa.parse("../assets/data/test-jul25/data.csv", {
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
        Papa.parse("../assets/data/test-jul25/biblio.csv", {
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
function createLocLabel(locList, removeLink = false) { // locList = [data["loc-0-prov"], data["loc-0-comune"], data["loc-0-contenitore"], <chronology for previous locations>]
    
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
        if (!removeLink) {
            locationText += `<a href="../query.html?city=${encodeURIComponent(locList[1])}">${locList[1]}</a>`;
        } else {
            locationText += `${locList[1]}`;
        }

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
    
    if (locList[3]) {
        locationText += `, ${locList[3]}`;
    }

    if(locList.length > 4) { // Chronology for previous locations
        locationText += `${locList[4] ? `, ${locList[4]}` : ""}`;
    }
    return locationText;
}


// ***********************
// ***********************
// ***********************

// UPDATE HTML with JQuery
function uploadData(data) {

    // == Main title (h2) and header in meta ==

    let entryTitle = data["autore-0-name"] + (data["autore-0-rif"] ? " (" + data["autore-0-rif"] + ")" : "") +
        ", " + capitalizeFirstLetter(data["soggetto"]);
    
    $("#meta-head").html(entryTitle + " (scheda)");

    $("#entry-title").html(entryTitle);

    // =====================

    // == Images ==
    let imgPath;
    if (data["img-path"] === "") {
        imgPath = "entry-placeholder.png";
    } else {
        imgPath = data["img-path"];
    }
    $("#entry-carousel-img-temp").attr("src", ("../assets/img/schede/" + imgPath));

    if (data["foto-b"]) {

        let counter = 1;

        // Thumbnail for first image;
        let mainThumbnail = `
                <div class="col-4 col-md-1 mb-1">
                    <img class="mx-auto d-block" src="${"../assets/img/schede/" + imgPath}" alt="Main image for ${entryTitle}" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0">
                </div>
            `;

        $("#carousel-thumbs").append(mainThumbnail);
        
        for (let path of data["foto-b"].split(";").map(item => item.trim())) {
            let newFullPath = `../assets/img/schede/${path}`;

            // Main carousel
            let newCarouselItem = `<div class="carousel-item">
                            <img src="${newFullPath}" class="d-block w-100" alt="...">
                        </div>`;
            $("#entry-carousel-img").append(newCarouselItem);

            // Thumbnails
            let newThumbnail = `
                <div class="col-4 col-md-1 mb-1">
                    <img class="mx-auto d-block" src="${newFullPath}" alt="Additional image for ${entryTitle}" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${counter}">
                </div>
            `;
            $("#carousel-thumbs").append(newThumbnail);

            counter++;
        }

        let controls = `
                    <!-- Controls  -->

                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
        `;
        $("#entry-carousel-img").append(controls);
    }
    
    // To update with carousel for more than one image
    // ============

    if (/[a-zA-Z]/.test(data["id"].toLowerCase())) {
        console.log(/[a-zA-Z]/.test(data["id"].toLowerCase()));
        $("#entry-author").html("Giuseppe Andolina");
    } else {
        $("#entry-author").html("Marco Scansani");
    }

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

        if (authorData[0].includes("[")) {

            // handles "Anonimo dell'Italia settentrionale [Antonio Rossellino]" (87, 160)

            let authorAnonym = authorData[0].split("[")[0].trim();
            let authorName = authorData[0].split("[")[1].replace("]", "").trim();

            /*
            authorData[0] = authorAnonym;
            authorData[1] = authorName;
            
            let authorString = `
                <div class="col-lg-4">
                    <p class="fs-5">
                        ${authorAnonym} [<a href="../query.html?aut=${encodeURIComponent(authorData[0])}">${authorName}</a>]
                        ${authorData[1] ? `<sup><a href="${authorData[1]}">[ULAN]</a></sup>` : ""}
                        ${authorData[2] ? `<span>(${authorData[2]})</span>` : ""}
                    </p>
                </div>
                
                <div class="col-lg-5">
                    <p class="fs-5"><span class="fw-bold">Motivazione: </span>${refineMotivationField(authorData[4])}</span></p>
                </div>`;*/
            
            if (authorData[1].includes(";")){
                authorData[1] = authorData[1].split(";")[1].trim();
            }

            let authorString = `
                <div class="col-lg-4">
                    <p class="fs-5">
                        ${authorAnonym} [<a href="../query.html?aut=${encodeURIComponent(authorName)}">${authorName}</a>]
                        ${authorData[1].includes("ulan") ? `<sup><a href="${authorData[1]}">[ULAN]</a></sup>` : ""}
                        ${authorData[2] ? `<span>(${authorData[2]})</span>` : ""}
                    </p>
                </div>
                
                <div class="col-lg-5">
                    <p class="fs-5"><span class="fw-bold">Motivazione: </span>${refineMotivationField(authorData[4])}</span></p>
                </div>`;

            return authorString;
        } else if (authorData[0].includes(";")) {

            // handles "Ludovico Castellani; Michele da Firenze" (326)   
            
            let authorName1 = authorData[0].split(";")[0].trim();
            let authorName2 = authorData[0].split(";")[1].trim();

            if (authorData[1].includes(";")) {
                ULAN1 = authorData[1].split(";")[0].trim();
                ULAN2 = authorData[1].split(";")[1].trim();
            }

            let authorString = `
                <div class="col-lg-4">
                    <p class="fs-5">
                        <a href="../query.html?aut=${encodeURIComponent(authorName1)}">${authorName1}</a>${ULAN1.includes("ulan") ? ` <sup><a href="${ULAN1}">[ULAN]</a></sup>` : ""}; <a href="../query.html?aut=${encodeURIComponent(authorName2)}">${authorName2}</a>${ULAN2.includes("ulan") ? ` <sup><a href="${ULAN2}">[ULAN]</a></sup>` : ""}
                        ${authorData[2] ? `<span>(${authorData[2]})</span>` : ""}
                    </p>
                </div>
                
                <div class="col-lg-5">
                    <p class="fs-5"><span class="fw-bold">Motivazione: </span>${refineMotivationField(authorData[4])}</span></p>
                </div>`;

            return authorString;
        } else {

            // all other cases

            let authorString = `
                <div class="col-lg-4">
                    <p class="fs-5">
                        <a href="../query.html?aut=${encodeURIComponent(authorData[0])}">${authorData[0]}</a>
                        ${authorData[1].includes("ulan") ? `<sup><a href="${authorData[1]}">[ULAN]</a></sup>` : ""}
                        ${authorData[2] ? `<span>(${authorData[2]})</span>` : ""}
                    </p>
                </div>
                
                <div class="col-lg-5">
                    <p class="fs-5"><span class="fw-bold">Motivazione: </span>${refineMotivationField(authorData[4])}</span></p>
                </div>`;
            
            return authorString;
        }
        
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
    if (data["data-da"] === data["data-a"]) {
        $("#entry-date").html(data["data-a"]);
    } else $("#entry-date").html(`${data["data-da"]} - ${data["data-a"]}`);

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
        if (!data["misure"].includes("verificare")) {
            $("#entry-mis-lab").html(`<p class="fs-5 fw-bold">Dimensioni</p>`);
            $("#entry-mis").html(`<p class="fs-5" id="entry-mis">${data["misure"]}</p>`);
        }
    }
    // =================

    // loc-0-prov,loc-0-comune,loc-0-geonames,loc-0-lat,loc-0-long,loc-0-contenitore,loc-0-specifica,loc-0-isOriginal,loc-1-isOriginal,loc-1-prov,loc-1-comune,loc-1-geonames,loc-1-contenitore,loc-1-specifica,loc-1-crono,loc-2-isOriginal,loc-2-prov,loc-2-comune,loc-2-geonames,loc-2-contenitore,loc-2-specifica,loc-2-crono,loc-3-isOriginal,loc-3-prov,loc-3-comune,loc-3-geonames,loc-3-contenitore,loc-3-specifica,loc-3-crono,loc-4-isOriginal,loc-4-prov,loc-4-comune,loc-4-geonames,loc-4-contenitore,loc-4-specifica,loc-4-crono

    // == Location ==
    let locData = [
        [data["loc-0-prov"], data["loc-0-comune"], data["loc-0-contenitore"], data["loc-0-specifica"]],
        [data["loc-1-prov"], data["loc-1-comune"], data["loc-1-contenitore"], data["loc-1-specifica"], data["loc-1-crono"]],
        [data["loc-2-prov"], data["loc-2-comune"], data["loc-2-contenitore"], data["loc-2-specifica"], data["loc-2-crono"]],
        [data["loc-3-prov"], data["loc-3-comune"], data["loc-3-contenitore"], data["loc-3-specifica"], data["loc-3-crono"]],
        [data["loc-4-prov"], data["loc-4-comune"], data["loc-4-contenitore"], data["loc-4-specifica"], data["loc-4-crono"]]
    ];
    $("#entry-current-loc").html(`<p class="fs-5">${createLocLabel(locData[0], false)}</p>`);

    if (locData[1].some((element) => element !== "")) { // If at least one alternative attribution exists
        $("#entry-other-locs").html(
            `<div class="col-lg-3">
                <p class="fs-5 fw-bold">Ubicazioni precedenti</p>
            </div>
            <div class="col-lg-9"><p class="fs-5">${createLocLabel(locData[1], true)}</p></div>

    
            ${locData[2].some((element) => element !== "") ? `<div class="col-lg-3 col-md-0"></div><div class="col-lg-9"><p class="fs-5">${createLocLabel(locData[2], true)}</p></div>` : ""}
    
            ${locData[3].some((element) => element !== "") ? `<div class="col-lg-3 col-md-0"></div><div class="col-lg-9"><p class="fs-5">${createLocLabel(locData[3], true)}</p></div>` : ""}
    
            ${locData[4].some((element) => element !== "") ? `<div class="col-lg-3 col-md-0"></div><div class="col-lg-9"><p class="fs-5">${createLocLabel(locData[4], true)}</p></div>` : ""}
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
    if (data["bibliografia"] != "" && data["bibliografia"] != "Inedito") {
        $("#entry-bib-lab").html(`<p class="fs-5 fw-bold">Bibliografia sintetica</p>`); 
        $("#entry-bib").html(getBibString(data["bibliografia"])); 
    }
    
    // ================

    // == Relationships ==

    /*

    function splitRel(rel) {
        let aList = "";
        if(rel.includes(";")) {
            rel.split(";").forEach(function (item) {
                aList += `<a href="../query.html?rel=${encodeURIComponent(item.trim())}">${item} <i class="bi bi-box-arrow-up-right"></i></a><br>`;
            });
    } else { 
            aList = rel; 
        }
    
        return aList;
    }

    */
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