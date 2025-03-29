let filteredData = [];

// *********** SECTION 1. *************
// * Load data with PapaParse (async) *
// ************************************

async function loadCSV() {
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

// Ancillary function to select the correct artwork
function filterById(data, str) {
    return data.filter(item => String(item.id) === String(str));
}

async function init() {
    try {
        // A. Load data with async function
        const data = await loadCSV();

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

// Ancillary function to set capital letter for first letter
function capitalizeFirstLetter(string) {
    if (typeof string !== 'string' || string.length === 0) {
      return ''; // Handle non-string inputs or empty strings
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // UPDATE HTML with JQuery
function uploadData(data) {

    // == Main title (h2) ==
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
            <p class="fs-5"><span class="fw-bold">Motivazione: </span>${authorData[4]}</span></p>
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
    $("#entry-obj-id").html(capitalizeFirstLetter(data["oggetto-def"]) + " (" + data["oggetto-id"] + ")");
    // ============

    // == Subject ==
    $("#entry-subj").html(
        `<a href="../query.html?sub=${encodeURIComponent(data["soggetto"])}">
            ${data["soggetto"]}
            ${data["denominazione"] ? ` (${data["denominazione"]})` : ""}</a>
        `
    );
    // =============

    // == Technique ==
    $("#entry-tech-lav").html(
        capitalizeFirstLetter(data["tecnica"]) + ", superficie: " + data["lavorazione"]
    );
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

}