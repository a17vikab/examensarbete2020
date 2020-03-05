<template>
  <div id="app">
    <Heatmap></Heatmap>
  </div>
</template>

<script>
import Heatmap from "./components/Heatmap.vue";

export default {
  name: "App",
  components: {
    Heatmap
  }
};
</script>

<style>
/* Standard style */
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
