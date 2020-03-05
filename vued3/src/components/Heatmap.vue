<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import L from "leaflet";

export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      function loadJSON(callback) {
        let obj = new XMLHttpRequest();
        obj.overrideMimeType("application/json");
        obj.open("GET", "./dataset.json", true);
        obj.onreadystatechange = function() {
          if (obj.readyState == 4 && obj.status == "200") {
            callback(obj.responseText);
          }
        };
        obj.send(null);
      }

      loadJSON(function(response) {
        let jsonResponse = JSON.parse(response);

        let map = L.map("map").setView([20, 20], 3);
        L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
          {
            maxZoom: 18
          }
        ).addTo(map);

        L.svg().addTo(map);

        d3.select("#map")
          .select("svg")
          .selectAll("dataPoints")
          .data(jsonResponse)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
            return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
          })
          .attr("cy", function(d) {
            return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
          })
          .attr("r", function(d) {
            return d.brightness * 0.01;
          })
          .style("fill", function(d) {
            if (d.brightness <= 310) {
              return "#C4D60A";
            } else if (d.brightness <= 320) {
              return "#FFA500";
            } else {
              return "#D60C0A";
            }
          })
          .attr("fill-opacity", 0.7);

        function Update() {
          d3.selectAll("circle")
            .attr("cx", function(d) {
              return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
            })
            .attr("cy", function(d) {
              return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
            });
        }
        map.on("moveend", Update);
      });
    }
  }
};
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>


