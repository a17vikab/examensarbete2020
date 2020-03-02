<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script src="../heatmap.js"></script>
<script src="../leaflet-heatmap.js"></script>
<script src="../app.js"></script>

<script></script>

<script>
export default {
  name: "HeatmapMap"
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  width: 100vw;
}

#map {
  height: 100%;
}

.leaflet-container {
  background: rgba(0, 0, 0, 0.8) !important;
}
</style>
