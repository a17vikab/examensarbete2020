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
    let jsonDataResponse = JSON.parse(response);
    //console.log(jsonDataResponse);
    let jsonData = {
      data: jsonDataResponse
    };
  });

  // let baseLayer = L.map("map").setView([20, 20], 3); .addTo(baseLayer);
  let leafletLayer = L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
    {
      attribution: "D3Pilot",
      maxZoom: 18
    }
  );

  let map = new L.Map("map", {
    center: new L.LatLng(20, 20),
    zoom: 3,
    layers: [leafletLayer]
  });

  let svg = d3.select("#map").select("svg"),
    g = svg.append("g");

  let d3Layer;
}

init();
