// ==UserScript==
// @name        heatmapMeasurement.js
// @namespace   http://tampermonkey.net/
// @version     0.1
// @description Measurement-script for heatmap-data.
// @author      Viktor Abrahamsson
// @match       http://127.0.0.1:5500/HeatmapJS/index.html
// ==/UserScript==

(function() {
  "use strict";
  var counter = localStorage.getItem("counter");
  if (counter <= 10 || counter == null) {
    var t0 = localStorage.getItem("t0");
    var t1 = localStorage.getItem("t1");
    var result = t1 - t0;
    localStorage.setItem("result", result);
    counter++;
    localStorage.setItem("counter", counter);
    window.location.reload();
  } else {
    var data = "";
    for (let i = 1; i < counter; i++) {
      data += localStorage.getItem("result" + i) + "\n";
    }
    console.log(data);
  }
})();
