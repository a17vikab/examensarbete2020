function init() {
  let map = L.map("map").setView([20, 20], 3);

  L.tileLayer(
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png",
    {
      attribution: "HeatmapPilot",
      maxZoom: 12
    }
  ).addTo(map);

  L.svg().addTo(map);
}

init();
