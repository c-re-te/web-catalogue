// Ancillary function to sortByDate

function parseYear(y) {
  if (y == null) return null;
  const s = String(y).trim();
  if (s === '') return null;
  const n = parseInt(s, 10);
  return Number.isFinite(n) ? n : null;
}

function compareByYearThenTo(a, b) {
  const af = parseYear(a['date-from']);
  const bf = parseYear(b['date-from']);

  if (af !== bf) {
    if (af == null) return 1;   // i vuoti vanno in coda
    if (bf == null) return -1;
    return af - bf;             // crescente
  }

  const at = parseYear(a['date-to']);
  const bt = parseYear(b['date-to']);

  if (at !== bt) {
    if (at == null) return 1;
    if (bt == null) return -1;
    return at - bt;
  }

  return 0;
}

// 3. sortData, so that user can rearrange the content


function sortData(criterion) {
    let sortedData = [...data]; // Copy the array to prevent direct modifications

    if(criterion == 'l0-city') {
        // Remove "Collezione privata", "Ubicazione ignota" from the main dataset
        let extractedData = sortedData.filter(el => el["l0-cont"] == "Collezione privata" || el["l0-cont"]  == "Ubicazione ignota");
        cleanedData = sortedData.filter((el) => !extractedData.includes(el));

        // Remove missing cities
        let missingData = cleanedData.filter(el => !el["l0-city"]);
        cleanedData = cleanedData.filter((el) => !missingData.includes(el));
        
        // Sort the cleaned main dataset
        cleanedData.sort((a, b) => {
            if (a[criterion] < b[criterion]) return -1;
            if (a[criterion] > b[criterion]) return 1;
            return 0;
        });

        // Sort the removed data
        extractedData.sort((a, b) => {
            if (a["l0-cont"] < b["l0-cont"]) return -1;
            if (a["l0-cont"] > b["l0-cont"]) return 1;
            return 0;
        });

        // Merge the three dataset [MAIN] + "Collezione privata" + "Ubicazione ignota" + missing cities

        sortedData = cleanedData.concat(extractedData).concat(missingData);

    } else if (criterion === 'date-from' || criterion === 'date-to') {
        sortedData.sort(compareByYearThenTo);
    } else {
        // fallback alfabetico per altri campi
        sortedData.sort((a, b) => {
        const A = (a[criterion] || '').toString().toLowerCase();
        const B = (b[criterion] || '').toString().toLowerCase();
        return A.localeCompare(B);
        });
    }

    data = sortedData; 
    if (criterion == "l0-city") {
        data.forEach(item => console.log(item["l0-city"]));
    }
    renderResults(currentPage, data, isGrid);  // Rende la lista ordinata
}
