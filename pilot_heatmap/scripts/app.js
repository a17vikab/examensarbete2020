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

function init() {
  loadJSON(function(response) {
    let jsonResponse = JSON.parse(response);

    let jsonData = {
      data: jsonResponse
    };

    let leafletLayer = L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
      {
        attribution: "HeatmapPilot",
        maxZoom: 18
      }
    );

    let config = {
      radius: 0.4,
      maxOpacity: 0.8,
      blur: 0.3,
      scaleRadius: true,
      useLocalExtrema: true,
      latField: "latitude",
      lngField: "longitude",
      valueField: "brightness"
    };

    let heatmapLayer = new HeatmapOverlay(config);

    let map = new L.Map("map", {
      center: new L.LatLng(20, 20),
      zoom: 3,
      layers: [leafletLayer, heatmapLayer]
    });

    heatmapLayer.setData(jsonData);
  });
}

init();
