<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as L from "leaflet";
// import Leaflet from "../assets/js/leaflet";

export default {
  components: {},
  data() {
    return {
      loadData: {}
    };
  },
  mounted() {
    // this.fetchData();
    // this.render();
    this.init();
  },
  methods: {
    async fetchData() {
      let data = await d3.json("./dataset.json");
      // let data1 = JSON.parse(data);
      const jsonData = {
        data: data
      };
      console.log(jsonData);
      // this.loadData = jsonData;
    },
    loadJSON(callback) {
      let obj = new XMLHttpRequest();
      obj.overrideMimeType("application/json");
      obj.open("GET", "./dataset.json", true);
      obj.onreadystatechange = function() {
        if (obj.readyState == 4 && obj.status == "200") {
          callback(obj.responseText);
        }
      };
      obj.send(null);
    },
    init() {
      function loadJSON(callback) {
        let obj = new XMLHttpRequest();
        obj.overrideMimeType("application/json");
        obj.open("GET", "./dataset.json", true);
        obj.onreadystatechange = function() {
          if (obj.readyState == 4 && obj.status == "200") {
            callback(obj.responseText);
          }
        };
        obj.send(null);
      }

      loadJSON(function(response) {
        let jsonResponse = JSON.parse(response);
        let jsonData = {
          data: jsonResponse
        };
        let map = L.map("map").setView([20, 20], 3);
        L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
          {
            maxZoom: 18
          }
        ).addTo(map);

        L.svg().addTo(map);

        console.log(jsonData);

        console.log(jsonData.data[0].longitude);

        d3.select("#map")
          .select("svg")
          .selectAll("dataPoints")
          .data(jsonResponse)

          .enter()
          .append("circle")
          .attr("cx", function(d) {
            return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
          })
          .attr("cy", function(d) {
            return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
          })
          .attr("r", "4")
          .style("fill", function(d) {
        if (d.brightness <= 310) {
          return "#C4D60A";
        } else if (d.brightness <= 320) {
          return "#FFA500";
        } else {
          return "#D60C0A";
        }
      })
          .attr("fill-opacity", 0.7);

        function Update() {
          console.log("Update() running");
          d3.selectAll("circle")
            .attr("cx", function(d) {
              return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
            })
            .attr("cy", function(d) {
              return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
            });
        }
        map.on("moveend", Update);
      });
    }
  }
};

// .attr("cx", function(jsonData) {
//             return map.latLngToLayerPoint([
//               jsonData.data[0].latitude,
//               jsonData.data[0].longitude
//             ]).x;
//           })
//           .attr("cy", function(jsonData) {
//             return map.latLngToLayerPoint([
//               jsonData.data[0].latitude,
//               jsonData.data[0].longitude
//             ]).y;
//           })

// render() {
//   const map = L.map("map").setView([20, 20], 3);
//   const tileLayer = L.tileLayer(
//     "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
//     {
//       maxZoom: 18
//     }
//   );
//   tileLayer.addTo(map);

//   L.svg().addTo(map);

//   d3.select("#map")
//     .select("svg")
//     .selectAll("dataPoints")
//     .data(jsonData)
//     .enter()
//     .append("circle")

//     .attr("cx", "50")
//     .attr("cy", "100")
//     .attr("r", "4")
//     .attr("fill", "#C4D60A")

//     // .attr("cx", function(d) {
//     //   return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
//     // })
//     // .attr("cy", function(d) {
//     //   return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
//     // })
//     // .attr("r", function(d) {
//     //   return d.brightness * 0.01;
//     // })
//     // .style("fill", function(d) {
//     //   if (d.brightness <= 310) {
//     //     return "#C4D60A";
//     //   } else if (d.brightness <= 320) {
//     //     return "#FFA500";
//     //   } else {
//     //     return "#D60C0A";
//     //   }
//     // })
//     .attr("fill-opacity", 0.7);

//   function Update() {
//     d3.selectAll("circle")
//       .attr("cx", function(d) {
//         return map.latLngToLayerPoint([d.latitude, d.longitude]).x;
//       })
//       .attr("cy", function(d) {
//         return map.latLngToLayerPoint([d.latitude, d.longitude]).y;
//       });
//   }
//   map.on("moveend", Update);
// }
</script>

<style scoped>
#map {
  width: 100vw;
  height: 100vh;
}
</style>


