<template>
  <div id="app">
    <Heatmap></Heatmap>
  </div>
</template>

<script>
import Heatmap from "./components/Heatmap.vue";
import * as d3 from "d3";

export default {
  name: "App",
  components: {
    Heatmap
  },
  data() {
    return {
      loadData: {}
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let data = await d3.json("./dataset.json");
      this.loadData = data;
    }
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
