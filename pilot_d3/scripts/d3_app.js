let map = L.map("map").setView([20, 30], 3);

let svg = d3.select("#map").select("svg"),
  g = svg.append("g");
