<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
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
      // console.log(data);
      this.loadData = data;
    },
    initMap() {
      this.map = L.map("map").setView([38.63, -90.23], 12);
      this.tileLayer = L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
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
