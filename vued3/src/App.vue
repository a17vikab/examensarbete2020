<template>
  <div id="app">
    <Heatmap></Heatmap>
    <Leaflet></Leaflet>
  </div>
</template>

<script>
import Heatmap from "./components/Heatmap.vue";
import Leaflet from "./assets/js/leaflet";

export default {
  name: "App",
  components: {
    Heatmap,
    Leaflet
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  height: 100vh;
  width: 100vw;
}
</style>
