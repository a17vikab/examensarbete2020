<template>
  <div id="app">
    <heatmapjsHeatmap></heatmapjsHeatmap>
  </div>
</template>

<script>
import HeatmapjsHeatmap from "./components/HeatmapjsHeatmap.vue";
import Heatmap from "./components/heatmap.js";
import LeafletHeatmap from "./components/leaflet-heatmap.js";

export default {
  name: "App",
  components: {
    HeatmapjsHeatmap,
    Heatmap,
    LeafletHeatmap
  }
};
</script>

<style>
#app {
}
</style>
