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
      let data = await d3.json("./dataset.json");
      console.log(data);
      this.loadData = data;
    },
    initMap() {
      this.map = L.map("map").setView([20, 20], 3);
      this.tileLayer = L.tileLayer(
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
        {
          maxZoom: 18
        }
      );
      this.tileLayer.addTo(this.map);
    },
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
