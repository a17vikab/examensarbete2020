function loadJSON(callback) {
  var obj = new XMLHttpRequest();
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
    var jsonResponse = JSON.parse(response);
    //const jsonResponse = response;
    //console.log(jsonResponse);

    var jsonData = {
      data: jsonResponse
    };

    var baseLayer = L.tileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "HeatmapTest",
        maxZoom: 18
      }
    );

    var cfg = {
      radius: 0.4,
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
