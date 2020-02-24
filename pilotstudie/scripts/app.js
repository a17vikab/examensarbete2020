window.onload = function() {
  var testData = {
    max: 8,
    data: [
      { lat: 20, lng: 20, count: 3 },
      { lat: 40, lng: 40, count: 5 },
      { lat: 60, lng: 60, count: 7 }
    ]
  };

  var baseLayer = L.tileLayer(
    "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution: "...",
      maxZoom: 18
    }
  );

  var cfg = {
    "radius": 2,
    "maxOpacity": 0.8,
    "scaleRadius": true,
    "useLocalExtrema": true,
    "latField": "lat",
    "lngField": "lng",
    valueField: "count"
  };

  var heatmapLayer = new HeatmapOverlay(cfg);

  var map = new L.map("map-canvas", {
    center: new L.LatLng(25, -80),
    zoom: 4,
    layers: [baseLayer, heatmapLayer]
  });

  heatmapLayer.setData(testData);
};
