// Function to load JSON-dataset asynchronously.
function loadJSON(callback) {
  // Create new instance of XMLHttpRequest
  let obj = new XMLHttpRequest();
  // Specifies type of data.
  obj.overrideMimeType("application/json");
  // Get the JSON-file.
  obj.open("GET", "./dataset.json", true);
  // EventHandler for readystatechange.
  obj.onreadystatechange = function() {
    // Defining the error.
    if (obj.readyState == 4 && obj.status == "200") {
      // Throw an "InvalidStateError".
      callback(obj.responseText);
    }
  };
  // Initiates request.
  obj.send(null);
}

function init() {
  loadJSON(function(response) {
    // Parse the response in JSON-format.
    let jsonResponse = JSON.parse(response);

    // Store the parsed JSON-data.
    let jsonData = {
      data: jsonResponse
    };

    // Create Map with Leaflet.js and set view & zoom.
    let map = L.map("map").setView([20, 20], 3);

    // Create a layer and get the actual map.
    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
      {
        attribution: "D3.js",
        maxZoom: 12
      }
      // Add to the map-variable
    ).addTo(map);

    // Add Leaflet-SVG to the map.
    L.svg().addTo(map);

    // Select element "map" and "svg".
    d3.select("#map")
      .select("svg")
      // Select all elements that will be drawn.
      .selectAll("dataPoints")
      // Add dataset as data() parameter.
      .data(jsonResponse)
      // Append new element "circle" depending on dataset.
      .append("circle")
      // Trying to link coordinates from dataset.
      .attr("cx", function() {
        return map.latLngToLayerPoint([latitude, longitude]);
      })
      .attr("cy", function() {
        return map.latLngToLayerPoint([latitude, longitude]);
      });
  });
}

// Run script.
init();
