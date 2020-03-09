// ==UserScript==
// @name        heatmapMeasurement.js
// @namespace   http://tampermonkey.net/
// @version     0.1
// @description Measurement-script for heatmap-data.
// @author      Viktor Abrahamsson
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @match       http://127.0.0.1:5500/HeatmapJS/index.html
// ==/UserScript==

var counter = localStorage.getItem("counter");
var numberOfRuns = 10;
var time = localStorage.getItem("time");

(function() {
  "use strict";
  if (counter == null || counter == NaN || counter == "") {
    counter = 0;
    localStorage.setItem("counter", counter);
  }

  if (counter < numberOfRuns) {
    console.log("Counter: " + localStorage.getItem("counter"));
    $("#startMeasurement").trigger("click");

    setTimeout(function() {
      if (time == "" || time == null) {
        time = [];
      } else {
        time = JSON.parse(time);
      }
    }, 3000);
  }
})();
