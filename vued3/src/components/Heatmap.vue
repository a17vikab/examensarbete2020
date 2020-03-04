<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import L from "leaflet";
// import Leaflet from "../assets/js/leaflet";

export default {
  components: {},
  data() {
    return {
      loadData: {}
    };
  },
  mounted() {
    this.fetchData();
    this.initMap();
    this.initLayers();
  },
  methods: {
    async fetchData() {
      const data = await d3.json("./dataset.json");
      console.log(data);
      this.loadData = data;

      this.map = L.map("map").setView([20, 20], 3);
      this.tileLayer = L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
        {
          maxZoom: 18
        }
      );
      this.tileLayer.addTo(this.map);

      d3.select("#map")
        .select("svg")
        .selectAll("dataPoints")
        .data(data)
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
    },
    initMap() {},
    initLayers() {}
  }
};
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
