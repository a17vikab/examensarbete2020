// ==UserScript==
// @name        d3Measurement.js
// @namespace   http://tampermonkey.net/
// @version     1
// @description Measurement-script for heatmap-data.
// @author      Viktor Abrahamsson
// @require     https://code.jquery.com/jquery-3.4.0.js
// @match       http://127.0.0.1:5500/HeatmapJS/index.html
// grant        none
// ==/UserScript==

var runs = 10;
var counter = localStorage.getItem("counter");
var resultArray = localStorage.getItem("resultArray");

(function() {
  if (counter == null || counter == "" || counter == "NaN") {
    counter = 0;
    localStorage.setItem("counter", counter);
  }

  if (counter < runs) {
    location.reload();
  }
})();

// result.push(localStorage.getItem("result"));
