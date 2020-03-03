<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
}
</style>
