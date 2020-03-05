<template>
  <div id="app">
    <!-- Insert Vue-component in html-flow. -->
    <Heatmap></Heatmap>
  </div>
</template>

<script>
// Import Heatmap from compnents.
import Heatmap from "./components/Heatmap.vue";

export default {
  name: "App",
  components: {
    // Declare components in App.vue.
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
