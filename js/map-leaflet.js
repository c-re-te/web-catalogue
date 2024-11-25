// Verifica se la mappa è già inizializzata
if (typeof map !== 'undefined' && map) {
    map.remove(); // Distrugge la mappa esistente
}

/*
// Crea la mappa
var map = L.map('mapid').setView([52, 10], 5); // [lat, lng], zoom

// Aggiungi uno strato base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Aggiungi il clustering
var markers = L.markerClusterGroup(); // Usa il plugin Leaflet.markercluster
*/

var artworks = [
    {
      id: 1,
      title: "Maestro degli angeli cantori - Testa di giovane",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 2,
      title: "Maestro degli angeli cantori - Testa di giovane",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 3,
      title: "Maestro degli angeli cantori - Testa di giovane",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 4,
      title: "Maestro degli angeli cantori - Busto",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 5,
      title: "Maestro degli angeli cantori - Veste",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 6,
      title: "Maestro degli angeli cantori - Panneggio",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 7,
      title: "Maestro degli angeli cantori - Veste",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 8,
      title: "Maestro degli angeli cantori - Panneggio",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 9,
      title: "Maestro degli angeli cantori - Ala",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 10,
      title: "Maestro degli angeli cantori - Busto",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 11,
      title: "Maestro degli angeli cantori - Busto",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 12,
      title: "Maestro degli angeli cantori - Busto",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 13,
      title: "Maestro degli angeli cantori - Busto",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 14,
      title: "Maestro degli angeli cantori - Braccio",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 15,
      title: "Maestro degli angeli cantori - Braccio",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 16,
      title: "Maestro degli angeli cantori - Piede",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 17,
      title: "Maestro degli angeli cantori - Ala",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 18,
      title: "Maestro degli angeli cantori - Tamburello",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 19,
      title: "Maestro degli angeli cantori - Panneggio",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 20,
      title: "Maestro degli angeli cantori - Panneggio",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 21,
      title: "Maestro degli angeli cantori - Panneggio",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 22,
      title: "Maestro degli angeli cantori - Panneggio",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 23,
      title: "Maestro degli angeli cantori - Rilievo",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 24,
      title: "Maestro degli angeli cantori - Rilievo",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 25,
      title: "Maestro degli angeli cantori - Rilievo",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 26,
      title: "Maestro degli angeli cantori - Evangelista",
      citta: "",
      latitude: "",
      longitude: ""
    },
    {
      id: 27,
      title: "Maestro degli angeli cantori; Giovanni de Fondulis (?) - Madonna col Bambino",
      citta: "Credera Rubbiano (CR)",
      latitude: 45.30327,
      longitude: 9.65606
    },
    {
      id: 28,
      title: "Maestro degli angeli cantori - Madonna col Bambino",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 29,
      title: "Maestro degli angeli cantori - Santa Lucia",
      citta: "Madignano (CR)",
      latitude: 45.34567,
      longitude: 9.72326
    },
    {
      id: 30,
      title: "Agostino de Fondulis (?) - testa femminile",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 31,
      title: "Anonimo cremasco - testa di cherubino",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 32,
      title: "Agostino de Fondulis (?) - San Girolamo",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 33,
      title: "Agostino de Fondulis (?) - San Gregorio Magno",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 34,
      title: "Agostino de Fondulis (?) - Sant'Agostino",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 35,
      title: "Agostino de Fondulis (?) - Sant'Ambrogio",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 36,
      title: "Anonimo lombardo - San Pietro?",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 37,
      title: "Anonimo lombardo - Frate",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 38,
      title: "Rinaldo de Staulis (?) - Angelo musicante",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 39,
      title: "Anonimo cremasco - Testa di monaco",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 40,
      title: "Giovanni da Roma (?) - Madonna col Bambino e angeli reggicortina",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 41,
      title: "Maestro della Madonna del topo - Madonna col Bambino",
      citta: "Sergnano (CR)",
      latitude: 45.42755,
      longitude: 9.70122
    },
    {
      id: 42,
      title: "Elia della Marra (?) - Crocefissione",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 43,
      title: "Anonimo dell'Italia settentrionale [Luca della Robbia] - Madonna col Bambino",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 44,
      title: "Sperandio Savelli - Madonna col Bambino",
      citta: "Castelleone (CR)",
      latitude: 45.29579,
      longitude: 9.76091
    },
    {
      id: 45,
      title: "Elia della Marra (?) - Polittico dell'Annunciazione",
      citta: "Casalmaggiore (CR)",
      latitude: 44.98981,
      longitude: 10.42055
    },
    {
      id: 46,
      title: "Anonimo lombardo - Madonna col Bambino",
      citta: "Casalmaggiore (CR)",
      latitude: 44.98981,
      longitude: 10.42055
    },
    {
      id: 47,
      title: "Anonimo lombardo  - Madonna dolente",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 48,
      title: "Rinaldo de Staulis - Madonna col Bambino",
      citta: "Soncino (CR)",
      latitude: 45.40033,
      longitude: 9.86845
    },
    {
      id: 49,
      title: "Rinaldo de Staulis - Angelo annunciante",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 50,
      title: "Rinaldo de Staulis - Maria Vergine Annunciata",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 51,
      title: "Rinaldo de Staulis - Profeta",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 52,
      title: "Rinaldo de Staulis - Profeta",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 53,
      title: "Rinaldo de Staulis - San Matteo",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 54,
      title: "Rinaldo de Staulis - San Giovanni evangelista",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 55,
      title: "Rinaldo de Staulis - San Marco",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 56,
      title: "Rinaldo de Staulis - Testa di angelo",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 57,
      title: "Rinaldo de Staulis (Bottega) - Cristo risorto",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 58,
      title: "Rinaldo de Staulis (Bottega) - Cristo in pietà",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 59,
      title: "Rinaldo de Staulis (Bottega) - Monogramma bernardiniano",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 60,
      title: "Rinaldo de Staulis (Bottega) - Testa di cherubino",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 61,
      title: "Galeotto Pavesi (?) - Testa d'uomo",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 62,
      title: "Anonimo lombardo - San Bernardino da Siena",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 63,
      title: "Anonimo lombardo - San Pietro Martire?",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 64,
      title: "Giovanni Antonio Amadeo - Madonna col Bambino",
      citta: "Castelleone (CR)",
      latitude: 45.29579,
      longitude: 9.76091
    },
    {
      id: 65,
      title: "Francesco Solari (Bottega) - Angelo",
      citta: "Castelleone (CR)",
      latitude: 45.29579,
      longitude: 9.76091
    },
    {
      id: 66,
      title: "Agostino de Fondulis - Cristo morto",
      citta: "Palazzo Pignano (CR)",
      latitude: 45.39007,
      longitude: 9.56956
    },
    {
      id: 67,
      title: "Agostino de Fondulis - Sant Maria Maddalena",
      citta: "Palazzo Pignano (CR)",
      latitude: 45.39007,
      longitude: 9.56956
    },
    {
      id: 68,
      title: "Agostino de Fondulis - San Giovanni evangelista",
      citta: "Palazzo Pignano (CR)",
      latitude: 45.39007,
      longitude: 9.56956
    },
    {
      id: 69,
      title: "Agostino de Fondulis - San Nicodemo",
      citta: "Palazzo Pignano (CR)",
      latitude: 45.39007,
      longitude: 9.56956
    },
    {
      id: 70,
      title: "Agostino de Fondulis - San Giuseppe d'Arimatea",
      citta: "Palazzo Pignano (CR)",
      latitude: 45.39007,
      longitude: 9.56956
    },
    {
      id: 71,
      title: "Agostino de Fondulis - Svenimento della Madonna",
      citta: "Palazzo Pignano (CR)",
      latitude: 45.39007,
      longitude: 9.56956
    },
    {
      id: 72,
      title: "Agostino de Fondulis - Natività",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 73,
      title: "Agostino de Fondulis - Resurrezione",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 74,
      title: "Agostino de Fondulis (Bottega) - Busto di donna",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 75,
      title: "Agostino de Fondulis (Bottega) - Busto di donna",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 76,
      title: "Agostino de Fondulis (Bottega) - Madonna col Bambino",
      citta: "Izano (CR)",
      latitude: 45.35552,
      longitude: 9.75138
    },
    {
      id: 77,
      title: "Agostino de Fondulis (Bottega) - San Rocco",
      citta: "Izano (CR)",
      latitude: 45.35552,
      longitude: 9.75138
    },
    {
      id: 78,
      title: "Agostino de Fondulis (Bottega) - San Sebastiano",
      citta: "Izano (CR)",
      latitude: 45.35552,
      longitude: 9.75138
    },
    {
      id: 79,
      title: "Agostino de Fondulis (Bottega) - Cristo Morto",
      citta: "Soncino (CR)",
      latitude: 45.40033,
      longitude: 9.86845
    },
    {
      id: 80,
      title: "Agostino de Fondulis (Bottega) - Santa Maria Maddalena",
      citta: "Soncino (CR)",
      latitude: 45.40033,
      longitude: 9.86845
    },
    {
      id: 81,
      title: "Agostino de Fondulis (Bottega) - San Giovanni evangelista",
      citta: "Soncino (CR)",
      latitude: 45.40033,
      longitude: 9.86845
    },
    {
      id: 81,
      title: "Agostino de Fondulis (Bottega) - San Nicodemo",
      citta: "Soncino (CR)",
      latitude: 45.40033,
      longitude: 9.86845
    },
    {
      id: 83,
      title: "Agostino de Fondulis (Bottega) - San Giuseppe d'Arimatea",
      citta: "Soncino (CR)",
      latitude: 45.40033,
      longitude: 9.86845
    },
    {
      id: 84,
      title: "Agostino de Fondulis (Bottega) - Svenimento della Madonna",
      citta: "Soncino (CR)",
      latitude: 45.40033,
      longitude: 9.86845
    },
    {
      id: 85,
      title: "Agostino de Fondulis (Seguace) - Busto di santo",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 86,
      title: "Rinaldo de Staulis (?) - Angelo",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 87,
      title: "Anonimo dell'Italia settentrionale [Antonio Rossellino] - Madonna col Bambino",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 88,
      title: "Anonimo lombardo - Cristo in pietà",
      citta: "Pizzighettone (CR)",
      latitude: 45.1869,
      longitude: 9.78781
    },
    {
      id: 89,
      title: "Anonimo lombardo - Madonna col Bambino",
      citta: "Ripalta Arpina (CR)",
      latitude: 45.30187,
      longitude: 9.72896
    },
    {
      id: 90,
      title: "Agostino de Fondulis - Pietà",
      citta: "Cremosano (CR)",
      latitude: 45.39467,
      longitude: 9.63826
    },
    {
      id: 91,
      title: "Anonimo lombardo - San Girolamo",
      citta: "Capergnanica (CR)",
      latitude: 45.33869,
      longitude: 9.64475
    },
    {
      id: 92,
      title: "Anonimo lombardo - Testa di bambino",
      citta: "Crema (CR)",
      latitude: 45.36264,
      longitude: 9.68176
    },
    {
      id: 93,
      title: "Antonio Campi (Bottega) - San Filippo",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 94,
      title: "Antonio Campi (Bottega) - San Giuda",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 95,
      title: "Antonio Campi (Bottega) - San Giacomo Maggiore",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 96,
      title: "Antonio Campi (Bottega) - San Mattia",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 97,
      title: "Antonio Campi (Bottega) - San Giovanni",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 98,
      title: "Antonio Campi (Bottega) - San Tommaso",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 99,
      title: "Antonio Campi (Bottega) - San Matteo",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 100,
      title: "Antonio Campi (Bottega) - San Giacomo Minore",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 101,
      title: "Antonio Campi (Bottega) - San Simone",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 102,
      title: "Antonio Campi (Bottega) - San Bartolomeo",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 103,
      title: "Antonio Campi (Bottega) - Sant'Andrea",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 104,
      title: "Antonio Campi (Bottega) - San Pietro",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 105,
      title: "Rinaldo de Staulis - Putto",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 106,
      title: "Rinaldo de Staulis - Tralci di vite",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 107,
      title: "Rinaldo de Staulis - Putto",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 108,
      title: "Rinaldo de Staulis - Tralci di vite",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 109,
      title: "Rinaldo de Staulis - Putto",
      citta: "Busseto (PR)",
      latitude: 44.9794,
      longitude: 10.04331
    },
    {
      id: 110,
      title: "Rinaldo de Staulis - Tralci di vite",
      citta: "Busseto (PR)",
      latitude: 44.9794,
      longitude: 10.04331
    },
    {
      id: 111,
      title: "Rinaldo de Staulis - Putto",
      citta: "Busseto (PR)",
      latitude: 44.9794,
      longitude: 10.04331
    },
    {
      id: 112,
      title: "Rinaldo de Staulis - Tralci di vite",
      citta: "Busseto (PR)",
      latitude: 44.9794,
      longitude: 10.04331
    },
    {
      id: 113,
      title: "Rinaldo de Staulis - Putto",
      citta: "Lodi (LO)",
      latitude: 45.31357,
      longitude: 9.50286
    },
    {
      id: 114,
      title: "Rinaldo de Staulis - Rami di quercia",
      citta: "Lodi (LO)",
      latitude: 45.31357,
      longitude: 9.50286
    },
    {
      id: 115,
      title: "Rinaldo de Staulis - Putto",
      citta: "Lodi (LO)",
      latitude: 45.31357,
      longitude: 9.50286
    },
    {
      id: 116,
      title: "Rinaldo de Staulis - Rami di quercia",
      citta: "Lodi (LO)",
      latitude: 45.31357,
      longitude: 9.50286
    },
    {
      id: 117,
      title: "Rinaldo de Staulis - Angelo",
      citta: "Castelleone (CR)",
      latitude: 45.29579,
      longitude: 9.76091
    },
    {
      id: 118,
      title: "Rinaldo de Staulis - Angelo",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 119,
      title: "Rinaldo de Staulis - Angelo",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 120,
      title: "Rinaldo de Staulis - Angelo",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 121,
      title: "Rinaldo de Staulis - Angelo",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 122,
      title: "Rinaldo de Staulis - Angelo",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 123,
      title: "Rinaldo de Staulis - Testa di putto",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 124,
      title: "Rinaldo de Staulis - Grappolo d'uva e uccello",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 125,
      title: "Rinaldo de Staulis - Grande foglia di vite",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 126,
      title: "Rinaldo de Staulis - Ghirlanda con iscrizione",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 127,
      title: "Rinaldo de Staulis - Peduccio con cherubino",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 128,
      title: "Rinaldo de Staulis - Fregio con angioletti e busti clipeati",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 129,
      title: "Rinaldo de Staulis - Testa di putto",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 130,
      title: "Rinaldo de Staulis - Profeta",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 131,
      title: "Rinaldo de Staulis - Profeta",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 132,
      title: "Rinaldo de Staulis - Profeta",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 133,
      title: "Rinaldo de Staulis - Profeta",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 134,
      title: "Rinaldo de Staulis - Profeta",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 135,
      title: "Rinaldo de Staulis - Profeta",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 136,
      title: "Rinaldo de Staulis - Profeta",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 137,
      title: "Rinaldo de Staulis - Profeta",
      citta: "Pavia (PV)",
      latitude: 45.19205,
      longitude: 9.15917
    },
    {
      id: 138,
      title: "Agostino de Fondulis - Testa d'uomo",
      citta: "",
      latitude: "",
      longitude: ""
    },
    {
      id: 139,
      title: "Agostino de Fondulis - Scene mitologiche e profili all'antica",
      citta: "Piacenza (PC)",
      latitude: 45.05242,
      longitude: 9.69342
    },
    {
      id: 140,
      title: "Agostino de Fondulis - Teoria di tritoni e girali vegetali",
      citta: "Piacenza (PC)",
      latitude: 45.05242,
      longitude: 9.69342
    },
    {
      id: 141,
      title: "Agostino de Fondulis - Zuffa degli dèi marini e profili all'antica",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 142,
      title: "Agostino de Fondulis - Scene mitologiche",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 143,
      title: "Agostino de Fondulis - Elementi vegetali, sfingi e busti di frati carmelitani",
      citta: "Soncino (CR)",
      latitude: 45.40033,
      longitude: 9.86845
    },
    {
      id: 144,
      title: "Agostino de Fondulis (Seguace) - Tritoni e nereidi",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 145,
      title: "Anonimo lombardo - Ritratto dell'imperatore Galba",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 146,
      title: "Anonimo lombardo - Testa d'uomo",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 147,
      title: "Agostino de Fondulis (Bottega) - Tritoni e stemmi",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 148,
      title: "Anonimo lombardo - Arpie e capitelli",
      citta: "Busseto (PR)",
      latitude: 44.9794,
      longitude: 10.04331
    },
    {
      id: 149,
      title: "Anonimo lombardo - Tritoni con vaso e tondo alato",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 150,
      title: "Anonimo lombardo - Cherubino con cornucopie",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 151,
      title: "Anonimo lombardo - Sremma della famiglia Pozzi",
      citta: "Cremona (CR)",
      latitude: 45.13325,
      longitude: 10.02129
    },
    {
      id: 152,
      title: "Michele da Firenze - Coppia di angeli",
      citta: "Ceresara (MN)",
      latitude: 45.26228,
      longitude: 10.56958
    },
    {
      id: 153,
      title: "Michele da Firenze (Bottega) - Busto angelico",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 154,
      title: "Michele da Firenze - Pilastrino con angeli",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 155,
      title: "Michele da Firenze - Cristo in pietà",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 156,
      title: "Michele da Firenze - Crocefisso",
      citta: "San Benedetto Po (MN)",
      latitude: 45.04612,
      longitude: 10.93367
    },
    {
      id: 157,
      title: "Michele da Firenze - San Girolamo",
      citta: "San Benedetto Po (MN)",
      latitude: 45.04612,
      longitude: 10.93367
    },
    {
      id: 158,
      title: "Michele da Firenze - Santo benedicente",
      citta: "(MN)",
      latitude: "",
      longitude: ""
    },
    {
      id: 159,
      title: "Michele da Firenze (?) - Figura virile cerofora (?)",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 160,
      title: "Anonimo mantovano [Luca Fancelli] (?) - Angeli reggi-ghirlanda",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 161,
      title: "Sperandio Savelli - San Francesco (?) e San Bernardino da Siena",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 162,
      title: "Sperandio Savelli - Madonna col Bambino e angeli reggicortina",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 163,
      title: "Sperandio Savelli (cerchia) - Testa virile",
      citta: "San Giorgio Bigarello, Stradella (MN)",
      latitude: 45.17245,
      longitude: 10.87327
    },
    {
      id: 164,
      title: "Sperandio Savelli (cerchia) - Angelo",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 165,
      title: "Sperandio Savelli (cerchia) - Angelo",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 166,
      title: "Elia della Marra - Compianto sul Cristo Morto",
      citta: "Sermide, Santa Croce (MN)",
      latitude: 44.98379,
      longitude: 11.25329
    },
    {
      id: 167,
      title: "Elia della Marra - Cristo in pietà",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 168,
      title: "Elia della Marra - Figura virile",
      citta: "Viadana (MN)",
      latitude: 44.93553,
      longitude: 10.51898
    },
    {
      id: 169,
      title: "Elia della Marra - Madonna col Bambino",
      citta: "Ceresara (MN)",
      latitude: 45.26228,
      longitude: 10.56958
    },
    {
      id: 170,
      title: "Elia della Marra - Madonna col Bambino",
      citta: "Bozzolo (MN)",
      latitude: 45.10324,
      longitude: 10.47988
    },
    {
      id: 171,
      title: "Elia della Marra - Madonna col Bambino",
      citta: "Parma (PR)",
      latitude: 44.79935,
      longitude: 10.32618
    },
    {
      id: 172,
      title: "Elia della Marra - Madonna col Bambino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 173,
      title: "Elia della Marra - Annunciazione",
      citta: "Castel Goffredo (MN)",
      latitude: 45.29403,
      longitude: 10.473
    },
    {
      id: 174,
      title: "Elia della Marra - Devote in preghiera",
      citta: "Viadana (MN)",
      latitude: 44.93553,
      longitude: 10.51898
    },
    {
      id: 175,
      title: "Elia della Marra - Madonna col Bambino, San Paolo e San Girolamo",
      citta: "San Benedetto Po  (MN)",
      latitude: 45.04612,
      longitude: 10.93367
    },
    {
      id: 176,
      title: "Elia della Marra - Madonna col Bambino",
      citta: "Castel d’Ario (MN)",
      latitude: 45.18798,
      longitude: 10.97449
    },
    {
      id: 177,
      title: "Elia della Marra - Madonna col Bambino",
      citta: "Sabbioneta, Villa Pasquali (MN)",
      latitude: 44.99943,
      longitude: 10.5155
    },
    {
      id: 178,
      title: "Elia della Marra - Madonna col Bambino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 179,
      title: "Elia della Marra - Madonna",
      citta: "Pegognaga (MN)",
      latitude: 44.99456,
      longitude: 10.85967
    },
    {
      id: 180,
      title: "Elia della Marra - Madonna col Bambino",
      citta: "Castel d’Ario (MN)",
      latitude: 45.18798,
      longitude: 10.97449
    },
    {
      id: 181,
      title: "Elia della Marra - Sant'Antonio Abate",
      citta: "",
      latitude: "",
      longitude: ""
    },
    {
      id: 182,
      title: "Elia della Marra - Cristo risorto",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 183,
      title: "Elia della Marra - San Giacomo Maggiore",
      citta: "Piubega (MN)",
      latitude: 45.22677,
      longitude: 10.53195
    },
    {
      id: 184,
      title: "Elia della Marra (?) - Madonna dell'Umiltà",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 185,
      title: "Elia della Marra (?) - Crocefissione",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 186,
      title: "Elia della Marra (?) - Tabernacolo",
      citta: "Parigi",
      latitude: 48.85341,
      longitude: 2.3488
    },
    {
      id: 187,
      title: "Elia della Marra (?) - Tabernacolo",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 188,
      title: "Elia della Marra (?) - Tabernacolo",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 189,
      title: "Elia della Marra (?) - Tabernacolo",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 190,
      title: "Elia della Marra (?) - Tabernacolo",
      citta: "Mantova, Frassino (MN)",
      latitude: 45.16016,
      longitude: 10.82059
    },
    {
      id: 191,
      title: "Elia della Marra (?) - Madonna col Bambino",
      citta: "Parigi",
      latitude: 48.85341,
      longitude: 2.3488
    },
    {
      id: 192,
      title: "Elia della Marra (?) - Madonna col Bambino",
      citta: "Curtatone, San Silvestro (MN)",
      latitude: 45.15253,
      longitude: 10.71989
    },
    {
      id: 193,
      title: "Elia della Marra (?) - Figura virile",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 194,
      title: "Anonimo mantovano - Dio Padre e angeli",
      citta: "Borgo Virgilio (MN)",
      latitude: 45.08266,
      longitude: 10.78748
    },
    {
      id: 195,
      title: "Anonimo mantovano - Madonna col Bambino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 196,
      title: "Anonimo mantovano - Madonna col Bambino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 197,
      title: "Anonimo lombardo - Madonna col Bambino",
      citta: "Suzzara (MN)",
      latitude: 44.99187,
      longitude: 10.74309
    },
    {
      id: 198,
      title: "Anonimo mantovano - Madonna col Bambino",
      citta: "Suzzara, Sailetto (MN)",
      latitude: 44.99187,
      longitude: 10.74309
    },
    {
      id: 199,
      title: "Anonimo mantovano - Madonna col Bambino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 200,
      title: "Anonimo mantovano - Madonna col Bambino",
      citta: "Pieve di Coriano (MN)",
      latitude: 45.03388,
      longitude: 11.1078
    },
    {
      id: 201,
      title: "Anonimo mantovano - Busto di Madonna",
      citta: "Goito (MN)",
      latitude: 45.25076,
      longitude: 10.66121
    },
    {
      id: 202,
      title: "Anonimo mantovano - Madonna col Bambino",
      citta: "",
      latitude: "",
      longitude: ""
    },
    {
      id: 203,
      title: "Anonimo mantovano - Putto reggi ghirlanda",
      citta: "Viadana (MN)",
      latitude: 44.93553,
      longitude: 10.51898
    },
    {
      id: 204,
      title: "Anonimo mantovano - Putto reggi ghirlanda",
      citta: "Viadana (MN)",
      latitude: 44.93553,
      longitude: 10.51898
    },
    {
      id: 205,
      title: "Anonimo mantovano - Madonna col Bambino",
      citta: "Pegognaga (MN)",
      latitude: 44.99456,
      longitude: 10.85967
    },
    {
      id: 206,
      title: "Anonimo mantovano - Madonna col Bambino",
      citta: "Volta Mantovana, Cereta (MN)",
      latitude: 45.30503,
      longitude: 10.64125
    },
    {
      id: 207,
      title: "Anonimo dell'Italia settentrionale [Anonimo toscano] - Madonna col Bambino",
      citta: "(MN)",
      latitude: "",
      longitude: ""
    },
    {
      id: 208,
      title: "Anonimo lombardo - San Francesco riceve le stimmate",
      citta: "Viadana (MN)",
      latitude: 44.93553,
      longitude: 10.51898
    },
    {
      id: 209,
      title: "Anonimo mantovano - Cristo risorto",
      citta: "collezione privata (MN)",
      latitude: "",
      longitude: ""
    },
    {
      id: 210,
      title: "Andrea della Robbia (Bottega) - Stemma di Gabriele Ginori",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 211,
      title: "Anonimo mantovano - Santo",
      citta: "Asola (MN)",
      latitude: 45.22018,
      longitude: 10.41214
    },
    {
      id: 212,
      title: "Anonimo mantovano - Peduccio con angelo",
      citta: "San Benedetto Po (MN)",
      latitude: 45.04612,
      longitude: 10.93367
    },
    {
      id: 213,
      title: "Anonimo mantovano - Peduccio con angelo",
      citta: "San Benedetto Po (MN)",
      latitude: 45.04612,
      longitude: 10.93367
    },
    {
      id: 214,
      title: "Anonimo mantovano - Apostolo",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 215,
      title: "Anonimo mantovano - Apostolo",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 216,
      title: "Anonimo mantovano - Apostolo",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 217,
      title: "Anonimo mantovano - Madonna annunciata",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 218,
      title: "Anonimo mantovano - Angelo Annunciante",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 219,
      title: "Anonimo mantovano - Annunciazione con tre apostoli",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 220,
      title: "Anonimo mantovano - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 221,
      title: "Gian Marco Cavalli (?) - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 222,
      title: "Anonimo mantovano - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 223,
      title: "Anonimo mantovano - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 224,
      title: "Gian Marco Cavalli (?) - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 225,
      title: "Gian Marco Cavalli (?) - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 226,
      title: "Gian Marco Cavalli (?) - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 227,
      title: "Anonimo mantovano (?) - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 228,
      title: "Anonimo mantovano (?) - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 229,
      title: "Anonimo mantovano (?) - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 230,
      title: "Anonimo mantovano (?) - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 231,
      title: "Anonimo mantovano (?) - Cherubino",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 232,
      title: "Gian Marco Cavalli (?) - Deposizione di Cristo",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 233,
      title: "Gian Marco Cavalli (?) - Compianto sul Cristo Morto",
      citta: "Medole (MN)",
      latitude: 45.32588,
      longitude: 10.51357
    },
    {
      id: 234,
      title: "Gian Marco Cavalli (?) - Giuseppe d'Arimatea",
      citta: "Medole (MN)",
      latitude: 45.32588,
      longitude: 10.51357
    },
    {
      id: 235,
      title: "Gian Marco Cavalli (?) - Nicodemo",
      citta: "Medole (MN)",
      latitude: 45.32588,
      longitude: 10.51357
    },
    {
      id: 236,
      title: "Gian Marco Cavalli (?) - San Giovanni evangelista",
      citta: "Medole (MN)",
      latitude: 45.32588,
      longitude: 10.51357
    },
    {
      id: 237,
      title: "Gian Marco Cavalli (?) - Maria Maddalena",
      citta: "Medole (MN)",
      latitude: 45.32588,
      longitude: 10.51357
    },
    {
      id: 238,
      title: "Gian Marco Cavalli (?) - Svenimento della Madonna",
      citta: "Medole (MN)",
      latitude: 45.32588,
      longitude: 10.51357
    },
    {
      id: 239,
      title: "Gian Marco Cavalli (?) - Cristo morto",
      citta: "Medole (MN)",
      latitude: 45.32588,
      longitude: 10.51357
    },
    {
      id: 240,
      title: "Gian Marco Cavalli (?) - Deposizione di Cristo",
      citta: "Viadana (MN)",
      latitude: 44.93553,
      longitude: 10.51898
    },
    {
      id: 241,
      title: "Gian Marco Cavalli (?) - San Sebastiano",
      citta: "Viadana (MN)",
      latitude: 44.93553,
      longitude: 10.51898
    },
    {
      id: 242,
      title: "Gian Marco Cavalli (?) - Madonna col Bambino",
      citta: "Revere (MN)",
      latitude: 45.05207,
      longitude: 11.13059
    },
    {
      id: 243,
      title: "Gian Marco Cavalli (?) - Pietà",
      citta: "San Giorgio Bigarello, Stradella (MN)",
      latitude: 45.17245,
      longitude: 10.87327
    },
    {
      id: 244,
      title: "Gian Marco Cavalli (?) - Battista Spagnoli",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 245,
      title: "Gian Marco Cavalli (?) - Francesco II Gonzaga",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 246,
      title: "Gian Marco Cavalli (?) - Virgilio",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 247,
      title: "Gian Marco Cavalli (?) - Girolamo Andreasi",
      citta: "Firenze (FI)",
      latitude: 43.77925,
      longitude: 11.24626
    },
    {
      id: 248,
      title: "Gian Marco Cavalli (?) - Francesco II Gonzaga",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 249,
      title: "Gian Marco Cavalli (?) - Battista Spagnoli",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    },
    {
      id: 250,
      title: "Gian Marco Cavalli (?) - Papa Giulio II",
      citta: "Mantova (MN)",
      latitude: 45.16031,
      longitude: 10.79784
    }
  ]

// Raggruppa le opere per città
const groupedArtworks = groupByCity(artworks);

// Crea la mappa
var map = L.map('mapid').setView([43.76956, 11.25581], 4); // Coordinate iniziali

// Aggiungi un layer base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Crea il cluster
var markers = L.markerClusterGroup();

// Aggiungi un marker per ogni città
groupedArtworks.forEach(city => {
    if (city.latitude && city.longitude) {
        const popupContent = `
            <a onclick="debug('${city.citta.replace(/'/g, "\\'")}')"><b>${city.citta}</b><br>
            Numero di opere: ${city.no}<br>
            <small><i>${city.artworks.join(",<br>")}</i></small></a>
        `;
        const marker = L.marker([city.latitude, city.longitude])
            .bindPopup(popupContent);
        markers.addLayer(marker);
    }
});

// Aggiungi il cluster alla mappa
map.addLayer(markers);

// Filtra le opere per ID
function filterById(artworks, ids) {
    return artworks.filter(artwork => ids.includes(artwork.id));
}

// Raggruppa le opere per città
function groupByCity(artworks) {
    const cityMap = artworks.reduce((acc, artwork) => {
        const cityKey = artwork.citta;
        if (!acc[cityKey]) {
            acc[cityKey] = {
                no: 0,
                citta: artwork.citta,
                latitude: artwork.latitude,
                longitude: artwork.longitude,
                artworks: []
            };
        }
        acc[cityKey].no += 1;
        acc[cityKey].artworks.push(artwork.title);
        return acc;
    }, {});

    // Converti l'oggetto in un array
    return Object.values(cityMap);
}

function debug(city) {
    console.log(`Click on: ${city}`);
    // TO INTEGRATE: Filter by current location
}