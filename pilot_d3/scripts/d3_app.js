function init() {
  loadJSON(function(response) {
    let jsonResponse = JSON.parse(response);

    let jsonData = {
      data: jsonResponse
    };

    let map = L.map("map").setView([20, 20], 3);

    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
      {
        attribution: "HeatmapPilot",
        maxZoom: 12
      }
    ).addTo(map);

    L.svg().addTo(map);

    d3.select("#map")
      .select("svg")
      .selectAll("myCircles")
      .data(jsonResponse);
  });
}

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

init();
