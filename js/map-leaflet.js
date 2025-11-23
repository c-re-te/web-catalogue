function leaflet_data(geo_csv) {

  // Take CSV file and convert it into a JSON object
  // The focuse here shifts from the single artwork to the city

  function jsonify_geocsv(data_array) {
    var artworks_locations = {};

    for (const artwork of data_array) {

      // console.log(artwork);
      if (artwork['lat'] && artwork['long']) {
        
        const city = artwork['l0-city'];

        if (!artworks_locations[city]) {
          artworks_locations[city] = {
            "prov": artwork['l0-prov'],
            "lat": artwork['lat'],
            "long": artwork['long'],
            "opere_id": []
          };
        }

        artworks_locations[city]['opere_id'].push(artwork['id']);
        artworks_locations[city]['count'] = artworks_locations[city]['opere_id'].length;
      }
    } 

    return artworks_locations; 
  }

  var artworks_locations = jsonify_geocsv(geo_csv); 

  // To update
  if (typeof map !== 'undefined' && map) {
    map.remove(); // If map exists, remove it
  }

  // Create map
  var map = L.map('mapid').setView([45.53558, 10.21472], 6);
  // Add base layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // ************
  // MAIN WORFLOW
  // ************

  // 1. DEFINE THE CLUSTER

  var markers = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
      // 1a. Count the value of artworks in the cluster
      var totalArtworks = 0;
      cluster.getAllChildMarkers().forEach(function (marker) {
        totalArtworks += marker.options.count; // Add the number to the marker
      });

      // 1b. Create an incon for the cluster
      return L.divIcon({
        html: `<div class="cluster-circle">${totalArtworks}</div>`, // See CSS below
        className: "cluster-icon",
        iconSize: [40, 40],
      });
    },

    // 1c. Custom the area covered by the cluster
    polygonOptions: {
      color: "#C85466",     // Polygon Boarder
      weight: 2,
      opacity: 0.8,
      fillColor: "#EFCED3", // Polygon Area
      fillOpacity: 0.4
    }
  });

  // 2. DEFINE THE PIN FOR THE SINGLE LOCATION

  // 2a. Set base pin
  var customPin = L.icon({
    // Icon
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41], 
    iconAnchor: [12, 41],

    // Popup
    popupAnchor: [1, -34], 
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  // 2b. Dynamically change pin color
  function createColoredIcon(color) {

    // Use SVG to change color
    const svgMarker = `
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41">
            <path fill="${color}" d="M12.5 0C7 0 2.5 4.5 2.5 10.5S12.5 41 12.5 41s10-20.5 10-30.5S18 0 12.5 0z" />
            <circle fill="#ffffff" cx="12.5" cy="10.5" r="4.5" />
        </svg>`;
    return L.divIcon({
      className: '',
      html: svgMarker,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  }

  // 2c.Add a mar
  for (let city in artworks_locations) {
    const cityData = artworks_locations[city];
    if (cityData.lat && cityData.long) {
      const opereText = cityData.count === 1 ? "Una scheda trovata" : `${cityData.count} schede trovate`;

      if (city.includes("'")) {city = city.replace("'", "\\'");} // Escape apostrophes in city names
      const popupContent = `
            <b>${city}</b> ${cityData.prov ? `(${cityData.prov})` : ''}<br>
            ${opereText}<br>
            <div class="row justify-content-center align-items-center">
              <button class="btn btn-primary mt-2" onclick="refineQuery('${city}', 'leaflet-map')"><small>Ricerca <i class="bi bi-search"></i></small></button>
            </div>
        `;
      const marker = L.marker([cityData.lat, cityData.long], {
        icon: createColoredIcon('#640817'), // Set color on pins
        count: cityData.count               // Set number on clusters
      }).bindPopup(popupContent);

      markers.addLayer(marker);
    }
  }

  // Add to map
  map.addLayer(markers);

  // ************

  // Custom CSS for the cluster
  var style = document.createElement('style');
  style.innerHTML = `
    .cluster-circle {
        width: 30px;
        height: 30px;
        background-color: #B10B25;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
    }

    .cluster-icon {
        width: 30px;
        height: 30px;
        line-height: 30px;
        border-radius: 50%;
    }
  `;
  document.head.appendChild(style);

}

// ************
