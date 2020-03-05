<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import L from "leaflet";

export default {
  name: "Heatmap",
  mounted() {
    this.init();
  },
  methods: {
    init() {}
  }
};
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>