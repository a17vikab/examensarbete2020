// Function to load JSON-dataset asynchronously.
function loadJSON(callback) {
  // Create new instance of XMLHttpRequest.
  let obj = new XMLHttpRequest();
  // Specifies type of data.
  obj.overrideMimeType("application/json");
  // Get the JSON-file.
  obj.open("GET", "../Dataset/dec_1-2_7_5.json", true);
  // EventHandler for readystatechange.
  obj.onreadystatechange = function () {
    // Defining the error.
    if (obj.readyState == 4 && obj.status == "200") {
      // Throw an "InvalidStateError".
      callback(obj.responseText);
    }
  };
  // Initiates request.
  obj.send(null);
}

function render() {
  // Set start-time.
  let t0 = new Date().getTime();

  loadJSON(function (response) {
    // Parse the response in JSON-format.
    let jsonData = JSON.parse(response);

    // Create Map with Leaflet.js and set view & zoom.
    let map = L.map("map").setView([20, 20], 3);

    // Create a layer and get the actual map.
    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
      {
        attribution: "D3.js",
        maxZoom: 12,
      }
      // Add to the map-variable.
    ).addTo(map);

    // Add Leaflet-SVG to the map.
    L.svg().addTo(map);

    // Select element "map" and "svg".
    d3.select("#map")
      .select("svg")
      // Select all elements that will be drawn.
      .selectAll("dataPoints")
      // Add dataset as data() parameter.
      .data(jsonData)
      // Create empty elements for the data.
      .enter()
      // Append new element "circle" depending on size of the dataset.
      .append("circle")
      // Linking coordinates from dataset to D3.js.
      .attr("cx", function (d) {
        return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
      })
      .attr("cy", function (d) {
        return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
      })
      // Add radius & style.
      .attr("r", function (d) {
        if (d.brightness <= 305) {
          return "4";
        } else if (d.brightness <= 310) {
          return "4.3";
        } else if (d.brightness <= 320) {
          return "4.6";
        } else if (d.brightness > 321) {
          return "5";
        }
      })
      // Depending on brightness, give according fill-color.
      .style("fill", function (d) {
        if (d.brightness <= 305) {
          return "rgb(0,191,255)";
        } else if (d.brightness <= 310) {
          return "rgb(0,255,0)";
        } else if (d.brightness <= 320) {
          return "rgb(255,255,0)";
        } else if (d.brightness > 321) {
          return "rgb(255,0,0)";
        }
      })
      .attr("fill-opacity", 0.4);
    // Set Stop-time.
    let t1 = new Date().getTime();

    // Calculate difference & store in localStorage for TamperMonkey.
    let result = t1 - t0;
    localStorage.setItem("result", result);
    console.log(localStorage);

    // Update function to render everything and update when the map changes.
    function Update() {
      // Select all d3-circles
      d3.selectAll("circle")
        // Update the coordniates depending on pan & zoom.
        .attr("cx", function (d) {
          return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
        })
        .attr("cy", function (d) {
          return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
        });
    }
    // Fire "Update()" when a move has ended on the map.
    map.on("moveend", Update);
  });
}

// Run script.
render();
