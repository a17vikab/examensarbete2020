// class JsonData {
//   async getJsonData() {
//     try {
//       let result = await fetch("dataset.json");
//       let data = await result.json();
//       data = data.map(object => {
//         const lat = data.latitude;
//         const long = data.longitude;
//         const brightness = data.brightness;
//         return { lat, long, brightness };
//       });
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// async function getJsonData() {
//   let result = await fetch("dataset.json");
//   let data = await result.json();
//   data = data.map(object => {
//     const lat = data.latitude;
//     const long = data.longitude;
//     const brightness = data.brightness;
//     return { lat, long, brightness };
//   });
//   return data;
// }

// const getJsonData = () => {};

// var testData = {
//   max: 8,
//   data: [
//     {
//       latitude: -4.6657,
//       longitude: 143.865,
//       brightness: 305.8
//     },
//     {
//       latitude: -15.8191,
//       longitude: 135.4216,
//       brightness: 328.3
//     }
//   ]
// };

// const getJsonData = () => {
//   let result = await fetch("dataset.json");
//   let data = await result.json();
//   data = data.map(object => {
//     const lat = data.latitude;
//     const long = data.longitude;
//     const brightness = data.brightness;
//     return { lat, long, brightness };
//   })
//   return data;
// };

// latField: "latitude",
// lngField: "longitude",
// valueField: "brightness"

// var testData = {
//   max: 8,
//   data: Json.getJsonData()
// };

// const { latitude, longitude, brightness } = require("../dataset.json");
// console.log(latitude);

// var jsonData = {
//   max: 8,
//   data: fetch("./dataset.json")
//     .then(function(resp) {
//       return resp.json();
//     })
//     .then(function(data) {
//       JSON.parse(data);
//     })
// };

// fetch("./dataset.json")
//   .then(function(resp) {
//     return resp.json();
//   })
//   .then(function(data) {
//     const fetchedData = data;
//     return fetchedData;
//   });

// $(document).ready(function() {
//   var json = require("../dataset.json");
// });

// import * as importData from "../dataset.json";

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "./dataset.json", true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init() {
  loadJSON(function(response) {
    var actual_JSON = JSON.parse(response);
    const jsonResponse = response;
    console.log(jsonResponse);

    var jsonData = {
      data: actual_JSON
    };

    var baseLayer = L.tileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "HeatmapTest",
        maxZoom: 18
      }
    );

    var cfg = {
      radius: 1,
      maxOpacity: 0.8,
      scaleRadius: true,
      useLocalExtrema: true,
      latField: "latitude",
      lngField: "longitude",
      valueField: "brightness"
    };

    var heatmapLayer = new HeatmapOverlay(cfg);

    var map = new L.Map("map", {
      center: new L.LatLng(0, 0),
      zoom: 2,
      layers: [baseLayer, heatmapLayer]
    });

    heatmapLayer.setData(jsonData);
  });
}

init();
