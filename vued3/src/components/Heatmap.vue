<template>
  <div>
    <!-- Element that contains map & visualization. -->
    <div id="map"></div>
  </div>
</template>

<script>
// Import D3.js & Leaflet.js and refer them as d3 & L.
import * as d3 from "d3";
import L from "leaflet";

export default {
  name: "Heatmap",
  mounted() {
    // Export method into index.html.
    this.init();
  },
  methods: {
    init() {
      // Function to load JSON-dataset asynchronously.
      function loadJSON(callback) {
        // Create new instance of XMLHttpRequest.
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

      // Set start-time.
      let t0 = new Date().getTime();

      loadJSON(function(response) {
        // Parse the response in JSON-format.
        let jsonData = JSON.parse(response);

        // Create Map with Leaflet.js and set view & zoom.
        let map = L.map("map").setView([20, 20], 3);

        // Create a layer and get the actual map.
        L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
          {
            attribution: "Vue.js + D3.js",
            maxZoom: 12
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
          .attr("cx", function(d) {
            return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
          })
          .attr("cy", function(d) {
            return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
          })
          // Add radius & style.
          .attr("r", function(d) {
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
          .style("fill", function(d) {
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
            .attr("cx", function(d) {
              return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
            })
            .attr("cy", function(d) {
              return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
            });
        }
        // Fire "Update()" when a move has ended on the map.
        map.on("moveend", Update);
      });
    }
  }
};
</script>

<style scoped>
/* Scoped style for only this component */
#map {
  width: 100vw;
  height: 100vh;
}

/* TODO: check if this effects */
.leaflet-container {
  background: rgba(0, 0, 0, 0.8) !important;
}
</style>
