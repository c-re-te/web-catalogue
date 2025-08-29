// =================================
// = ANCILLARY FUNCTIONS & HELPERS =
// =================================

// 1) SORT by DATE

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

// 2) SORT by AUTHOR

// CONSTANTS
const CUSTOM_AUTHOR_ORDER = [
  // A
  "Luigi Acquisti",
  "Agostino di Duccio",
  "Giovanni Antonio Amadeo",
  "Andrea da Giona",
  "Antonio di Cristoforo",
  "Antonio di Gregorio",
  "Antonio di Simone Fiorentino",

  // B
  "Baccio da Montelupo",
  "Pietro Barilotto",
  "Niccolò Baroncelli",
  "Giovanni Battagio",
  "Antonio Begarelli",
  "Ludovico Begarelli",
  "Bartolomeo Bellano",
  "Benedetto da Maiano",
  "Camillo Bisogni",
  "Paolo Bisogni",
  "Domenico Boccalaro",
  "Andrea Briosco, detto il Riccio",
  "Benedetto Buglioni",
  "Michelangelo Buonarroti",

  // C
  "Gasparo Cairano",
  "Antonio Campi",
  "Giulio Campi",
  "Lorenzo Canozi da Lendinara",
  "Caradosso",
  "Lazzaro Casario",
  "Ludovico Castellani",
  "Giovanni Catalano",
  "Gian Marco Cavalli",
  "Cesare Cesariano",
  "Prospero Clemente",
  "Girolamo Coltellini",
  "Francesco del Cossa",
  "Cristoforo da Firenze",

  // D
  "Desiderio da Settignano",
  "Marsilio Dini",
  "Domenico di Paris",
  "Donatello",

  // E
  // (nessuno in elenco)

  // F
  "Luca Fancelli",
  "Filarete",
  "Tommaso Filippi da Varignana",
  "Gabriele Fiorini",
  "Agostino de Fondulis",
  "Giovanni de Fondulis",
  "Francesco Francia",
  "Gabriele Frisoni",

  // G
  "Gian Cristoforo Ganti",
  "Saturnino Gatti",
  "Lorenzo Ghiberti",
  "Giovanni da Pisa",
  "Giovanni da Roma",
  "Giovanni da Siena",
  "Giovanni Pietro da Rho",
  "Gregorio di Lorenzo",
  "Orazio Grillenzoni",

  // L
  "Niccolò di Pietro Lamberti",
  "Alfonso Lombardi",
  "Girolamo Lombardi",
  "Tullio Lombardo",

  // M
  "Maestro degli angeli cantori",
  "Maestro del Compianto del Carmine di Brescia",
  "Maestro del Compianto di Brisighella",
  "Maestro del Compianto Testa",
  "Maestro del Compianto di Reggio Emilia",
  "Maestro della Madonna del topo",
  "Maestro del Monumento Fava",
  "Andrea Mantegna",
  "Francesco Manzini",
  "Antonio Marescotti",
  "Elia della Marra",
  "Marsilio di Antonio",
  "Giuseppe Mazza",
  "Guido Mazzoni",
  "Gian Luigi de Medici",
  "Alessandro Menganti",
  "Michele da Firenze",
  "Giovanni Minelli",

  // N
  "Nanni di Banco",
  "Niccolò dell'Arca",
  "Nicholaus",

  // O
  "Vincenzo Onofri",

  // P
  "Carlo di Cesare del Palagio",
  "Galeotto Pavesi",
  "Giovanni Gaspare Pedoni",
  "Antonio Francesco Pinola",
  "Niccolò Pizzolo",
  "Antonio del Pollaiolo",
  "Piero del Pollaiolo",
  "Pagno di Lapo Portigiani",

  // Q
  "Jacopo della Quercia",

  // R
  "Giovanni Ricci",
  "Andrea della Robbia",
  "Giovanni della Robbia",
  "Girolamo della Robbia",
  "Luca della Robbia",
  "Luca della Robbia \"il giovane\"",
  "Tommaso Rodari",
  "Antonio Rossellino",
  "Properzia de' Rossi",

  // S
  "Jacopo Sansovino",
  "Sperandio Savelli",
  "Francesco Segala",
  "Silvestro dell'Aquila",
  "Cristoforo Solari",
  "Filippo Solari",
  "Francesco Solari",
  "Rinaldo de Staulis",

  // T
  "Leonardo del Tasso",
  "Cosmè Tura",

  // U
  // (nessuno in elenco)

  // V
  "Vecchietta",
  "Alessandro Vittoria",

  // Z
  "Giovanni Zacchi",
  "Zaccaria Zacchi"
];

// • Creation of a map: author (normalised string) -> position in CUSTOM_AUTHOR_ORDER
const AUTHOR_RANK = (() => {
  const map = new Map();
  CUSTOM_AUTHOR_ORDER.forEach((name, idx) => {
    map.set(normalizeAuthor(name), idx);
  });
  // Normalise "Luca della Robbia \"il giovane\""
  map.set(normalizeAuthor('Luca della Robbia il giovane'), map.get(normalizeAuthor('Luca della Robbia "il giovane"')));
  return map;
})();

// ANCILLARY FUNCTIONS

// Normalize author string
function normalizeAuthor(s) {
  return (s || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/["“”]/g, '')   // removes ""
    .replace(/\s+/g, ' ');   // collapse multiple spaces -> single
}

// Return boolean if author is anonymous (goes at the end)
function isAnonimoName(s) {
  const n = normalizeAuthor(s);
  return n.startsWith('anonimo'); // qualunque “Anonimo…”
}

// Given an author field (possibly multiple authors separated by ';'), return an object {rank, key}
function authorRankValue(authorField) {
  // Clean data (null/undefined; empty entries), trim white spaces and handle multiple authors
  const first = (authorField || '').split(';')[0]?.trim() || '';

  // If author is anonymous, goes to the end
  if (isAnonimoName(first)) {
    return { rank: Number.POSITIVE_INFINITY, key: 'zzz_anonimo' }; // all anonymous grouped are treated in the same way
  }

  // If no author, goes at the very end
  if (!first) return { rank: Number.POSITIVE_INFINITY + 1, key: '' };

  // Initialise bestRank (bottom): if better is found (is in CUSTOM_AUTHOR_ORDER), use rank
  let bestRank = Number.POSITIVE_INFINITY;
  let bestKey = '';

  const n = normalizeAuthor(first);
  if (AUTHOR_RANK.has(n)) {
    bestRank = AUTHOR_RANK.get(n);
    bestKey = n;
  } else {
    // Raw alphabetical order for elements not in CUSTOM_AUTHOR_ORDER
    bestKey = n;
  }

  return { rank: bestRank, key: bestKey };
}

// Compare two objects by their rank and key
function compareByAuthor(a, b, fieldName) {
  const A = authorRankValue(a[fieldName]);
  const B = authorRankValue(b[fieldName]);

  // Check by rank - custom list
  if (A.rank !== B.rank) return A.rank - B.rank;

  // If equal rank, alphabetical order
  return A.key.localeCompare(B.key);
}

// =================
// = MAIN FUNCTION =
// =================

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

    // Sort by DATE
    } else if (criterion === 'date-from' || criterion === 'date-to') {
        sortedData.sort(compareByYearThenTo);
    
    // Sort by AUTHOR
    } else if (criterion === 'author' || criterion === 'aut' || criterion === 'author-name') {
    sortedData.sort((a, b) => compareByAuthor(a, b, criterion));
    console.log(sortedData);
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
