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
      radius: 0.5,
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
